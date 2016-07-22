// Process Flow:
// 1. User Requests Song by searching, or placing in youtube url
// 2. vexBot locates user's voice channel, but realistically, we just want it playing in music channel
// 3. vexBot downloads music into temp directory, and plays that.
// 4. vexBot deques music.
// While vexBot not in use, play 118 songs.

var http = require('http');
var fs = require('fs');
var exec = require('child_process').exec;
var ytdl = require('ytdl-core');

var DOWNLOAD_DIR = './musics/';

var audioStream = null;
var currentVoiceChannel = null;
var currentSong = null;
var queue       = new Array();
var idleQueue   = new Array("gEbcEYbxmqQ", "R5xzaDo5Q54", "UFrDpx7zLtA", "xHRkHFxD-xY", "SgM3r8xKfGE");
var idlePos     = 0;
var idle        = true;
var skipSet     = new Set();

function convertFlvToMp3(source_file, destination_dir, callback) {
	var destination_file = source_file.split('/').slice(-1)[0].replace('.flv', '.mp3');
	var ffmpeg = 'ffmpeg -i '+ source_file + ' ' + destination_dir + destination_file;
	var child = exec(ffmpeg, function(err, stdout, stderr) {
		if (err) {
			callback(err);
		} else {
			// Delete the movie file from the directory.
			var rm = 'rm ' + source_file;
			console.log(source_file.split('/').slice(-1)[0] +' converted to '+ destination_file);
			callback();
			exec(rm, function (err, stdout, stderr) {
				if (err) {
					console.log(error);
				}
			});
		}
	});  // Exec ffmpeg.
}

function downloadVideo(url, dir_dest, file_dest, callback) {
	var stream = ytdl(url).pipe(fs.createWriteStream(dir_dest + file_dest));
	stream.on('finish', function () {
		convertFlvToMp3(dir_dest + file_dest, dir_dest, callback);
	});
}

function YoutubeSong(videoUrl, username, userID) {
	// Validates URL.
	var regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
	var match = videoUrl.match(regExp);

	if (match[1]) {
		this.videoUrl = videoUrl;
		this.username = username;
		this.userID = userID;
		this.isValid = true;
		this.id = match[1];
	} else {
		this.isValid = false;
	}
	YoutubeSong.prototype.downloadSong = function(callback) {
		var dir_dest = DOWNLOAD_DIR;
		var file_dest = this.id + '.flv';
		downloadVideo(this.videoUrl, dir_dest, file_dest, callback);
	}
}

function addSong(url, username, userID) {
	idle = false;

	if (!currentChannel) {
		joinChannel();
	}
	if (url && url.length > 0) {
		var youtubeSong = new YoutubeSong(url, username, userID);
		var exist = false;
		var files = fs.readdirSync(DOWNLOAD_DIR);

		for (var i = 0; i < files.length; i++) {
			if (files[i] == youtubeSong.id + '.mp3') {
				exist = true;
				break;
			}
		}
		if (youtubeSong.isValid) {
			if (exist) {
				console.log('Music already downloaded, adding to queue... .');
				queue.push(youtubeSong);

				if (currentSong == null) {
					start();
				}
			} else {  // Download music.
				youtubeSong.downloadSong(function (err) {
					if (err) {
						console.error(err);
						//sendMessage('@' + youtubeSong.username + ' Impossible to load ' + youtubeSong.url);
					} else {
						queue.push(youtubeSong);

						if (currentSong == null) {
							start();
						}
					}
				});
			}
		}
	}
}

// Start the first song in the queue.
function start() {
	var songPath = DOWNLOAD_DIR;
	var endFun;

	if (queue.length > 0) {
		currentSong = queue[0];

		if (!currentSong || currentSong.isValid) {
			return;
		}
		songPath += currentSong.id;
		endFun = songEnded;
	} else {
		songPath += idleQueue[idlePos++];

		if (idlePos >= idleQueue.length) {
			idlePos = 0;
		}
		endFun = start;
	}
	songPath += '.mp3';
	skipSet.clear();

	if (audioStream) {
		audioStream.playAudioFile(songPath);
		audioStream.once('fileEnd', endFun);
	} else {
		setTimeout(start, 500);
	}
}

function songEnded() {
	console.log("songEnded");
	queue.shift();
	start();
}

// Stop the audio.
function stop() {
	audioStream.stopAudioFile();
	currentSong = null;
}

// Start the next song if there is one.
function nextSong() {
	skipSet.clear();
	console.log("stop");
	stop();
}

// Skip if more than 50% of the users have typed ".skip".
// TODO: check for user in the same voice channel.
// TODO: Add confirmation that song has been skipped.
function skip(userID) {
	skipSet.add(userID);

	var skipSum = skipSet.size;
	var onlineMembers = 0;//2;
/*
	var serverID = "197777408198180864";  // Only one server.
	for (var memberID in vexBot.servers[serverID].members) {
		if (vexBot.servers[serverID].members[memberID].status == 'online') {
			onlineMembers++;
		}
	}
*/
	console.log('onlineMembers = ' + onlineMembers);
	console.log('skipSum : ' + skipSum);
	console.log('(onlineMembers / 2) : ' + (onlineMembers / 2));
	console.log('Condition : ' + (skipSum > (onlineMembers / 2)));
	console.log(skipSet);

	if (skipSum > onlineMembers) {
		if (queue.length > 0) {
			nextSong();
		}
		console.log('Skipped song');
		skipSet.clear();
	}
}
/*
// Return the voice channel where the user is.
function findVoiceChannelIdWhereUserIs(userID) {
	var voiceChannel = null;
	for (var s in vexBot.servers) {
		for(var uID in vexBot.servers[s].members) {
			if (uID == userID) {
				voiceChannel = vexBot.servers[s].members[uID].voice_channel_id;
			}
		}
	}
	return voiceChannel;
}
*/
// Join the voice channel where the user is.
function joinChannel() {
	currentVoiceChannel = "197818048147750912";//findVoiceChannelIdWhereUserIs(userID);

	vexBot.client.joinVoiceChannel(currentVoiceChannel, function () {
		vexBot.client.getAudioContext({channel: currentVoiceChannel, stereo: true}, function(stream) {
			audioStream = stream;
		});
	});
	if (idle) {
		start();
	}
}

function leaveChannel() {
	//currentVoiceChannel = "197818048147750912";//findVoiceChannelIdWhereUserIs(userID);
	vexBot.client.leaveVoiceChannel(currentVoiceChannel);
	currentVoiceChannel = null;
}

vexBot.commands.join = function(data) {
	joinChannel();
}
vexBot.commandUsage.join = "";
vexBot.commandDescs.join = "Joins the voice channel.";

vexBot.commands.leave = function(data) {
	leaveChannel();
}
vexBot.commandUsage.leave = "";
vexBot.commandDescs.leave = "Leaves the voice channel.";

vexBot.commands.play = function(data) {
	addSong(data.message, data.name, data.id);
}
vexBot.commandUsage.play = "<youtube url>";
vexBot.commandDescs.play = "Plays audio from a YouTube video (or adds it to the queue).";

vexBot.commands.skip = function(data) {
	skip(data.id);
}
vexBot.commandUsage.skip = "";
vexBot.commandDescs.skip = "Votes to skip current song.";

vexBot.commands.playmusic = function(data) {
	console.log("CMD Recieved");
 	vexBot.joinVoiceChannel(channelID, function() {
		console.log("Chan Joined");
    	vexBot.getAudioContext({ channel: channelID, stereo: true}, function(stream) {
      		stream.playAudioFile(data); //To start playing an audio file, will stop when it's done.
		});
	});
};

/*
stream.stopAudioFile(); //To stop an already playing file
stream.once('fileEnd', function() {
  //Do something now that file is done playing. This event only works for files.
});
*/

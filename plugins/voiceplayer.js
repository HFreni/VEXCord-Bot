var channelID = "197818048147750912";

vexBot.commands.playMusic = function(data) {
  vexBot.joinVoiceChannel(channelID, function() {
    vexBot.getAudioContext({ channel: channelID, stereo: true}, function(stream) {
      stream.playAudioFile(data); //To start playing an audio file, will stop when it's done.
      /* Put Stuff Here */
    });
  });
};

/*
stream.stopAudioFile(); //To stop an already playing file
stream.once('fileEnd', function() {
  //Do something now that file is done playing. This event only works for files.
});
*/

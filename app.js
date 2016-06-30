var Discord = require("discord.io");
var vexbot	= new Discord.Client({
	token: "MTk4MTE5MTA0NDkyNzMyNDE2.ClbgSw.UhlPpN-LlwwiKvyRfllQ7i9dtd0",
	autorun: true
});

vexbot.on('ready', function() {
	console.log(vexbot.username + " -  ( " + vexbot.id + ")" );
	vexbot.setPresence({
		idle_since: null,
		game: "Harri is a gud programmer"
	});
});

vexbot.on('message', function(user, userID, channelID, message, event) {
	if(message === "| VEXDB") {
		vexbot.sendMessage({
			to: channelID,
			message: "pong"
		});
		vexbot.uploadFile({
			to: channelID,
			file: "dank.jpg",
			filename: "mankdemes.jpg",
			message: "What a good meme"
		});
		console.log("Message Recieved")
	}
});

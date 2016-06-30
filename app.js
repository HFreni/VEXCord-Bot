var Discord = require("discord.io");
var vexbot	= new Discord.Client({
	token: "MTk4MTE5MTA0NDkyNzMyNDE2.ClbgSw.UhlPpN-LlwwiKvyRfllQ7i9dtd0",
	autorun: true
});

vexbot.on('ready', function() {
	console.log(vexbot.username + " -  ( " + vexbot.id + ")" );
});

vexbot.on('message', function(user, userID, channelID, message, event) {
	if(message === "| VEXDB") {
		vexbot.sendMessage({
			to: channelID,
			message: "pong"
		});
		console.log("Message Recieved")
	}
});

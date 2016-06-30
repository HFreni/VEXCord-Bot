// Your run of the mill imports!
var Discord = require("discord.io");

// This is our auth token, and it's going on github :D
var vexbot	= new Discord.Client({
	token: "MTk4MTE5MTA0NDkyNzMyNDE2.ClbgSw.UhlPpN-LlwwiKvyRfllQ7i9dtd0",
	autorun: true
});

// Make all of our commands as variables to make code as modular as possible.
var commandChar 	= "|";
var vexDBCommand	= commandChar + " VEXDB TEAM";


// Initialization command.
// This lets us know that the bot has connected to the discord server,
// and has will let us have control over the presence of the bot.
vexbot.on('ready', function() {
	console.log(vexbot.username + " -  ( " + vexbot.id + ")" );
	vexbot.setPresence({
		idle_since: null,
		game: "10 BPS"
	});
});

// This is the main listening function in which commands are read & seen by the bot
vexbot.on('message', function(user, userID, channelID, message, event) {
	// if message x is receieved print y
	// Make this more dynamic.

	// Unfinished command to search for user input and then call vexDB
	if(message.search(vexDBCommand)) {
		console.log("It worked");
		bot.sendMessage({
			to: channelID,
			message: "VEXDB Info Here"
		});
	}
});

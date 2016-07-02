vexBot.commands.ping = function(data) {
	return "pong";
}

vexBot.commands.id = function(data) {
	return "Your user ID: " + data.id;
}

const vm = require('vm');

vexBot.commands[">"] = function(data) {
	if (vexBot.admins.indexOf(data.id) === -1) {
		return "Permission denied.";
	}
	return (new vm.Script(data.message)).runInThisContext();
}

vexBot.commands.help = function(data) {
	var help = "";
	for (var key in vexBot.commandDescs) {
		if (vexBot.commandDescs.hasOwnProperty(key)) {
			if (vexBot.commandUsage[key]) {
				help += vexBot.commandPrefix + key + " " + vexBot.commandUsage[key] + " - " + vexBot.commandDescs[key] + "\n";
			} else {
				help += vexBot.commandPrefix + key + " - " + vexBot.commandDescs[key] + "\n";
			}
		}
	}
	return help;
}
vexBot.commandDescs.help = "Lists bot commands";

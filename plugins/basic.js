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
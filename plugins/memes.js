var memes = [
	"10 BPS",
	"TaborC",
	"RobotC",
	"EasyC",
	"Counter-Strike: Global Offensive",
	"Robot Virtual Worlds",
	"Razor Flywheel Simulator",
	"Vex forum Q&A",
	"How2Grill",
	"Not Kyle",
	"Vex Memes",
	"BNS 3 Way",
]

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = function() {
	vexBot.client.setPresence({
		idle_since: null,
		game: memes[rand(0, memes.length - 1)]
	});

	setInterval(function() {
		vexBot.client.setPresence({
			idle_since: null,
			game: memes[rand(0, memes.length - 1)]
		});
	}, 300000)
}

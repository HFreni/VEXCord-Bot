var http = require('http');
var unirest = require('unirest');

var vexdbGet = function(url, cb) {
	var req = unirest.get("http://api.vexdb.io/v1/" + url + "&apikey=shNhxcphXlIXQVE2Npeu")
		.headers({'User-Agent': 'RoBot v1.0.0 git.io/vohPQ'})
		.end(function(res) {
			if (res.statusType != 2) {
				cb(false, res.code);
			} else {
				cb(true, JSON.parse(res.raw_body));
			}
		});
};

vexBot.commands.vexdbraw = function(data) {
	vexdbGet(data.message, function(err, dat) {
		data.respond("```" + JSON.stringify(dat, null, 4) + "```");
	})
}

vexBot.commands.team = function(data) {
	data.message = data.message.toUpperCase()
	vexdbGet("get_teams?team=" + encodeURIComponent(data.message), function(err, team_info) {
		if (team_info.status != 1 || !err || !team_info.result[0]) {
			data.respond("Could not find team");
		} else {
			var t = team_info.result[0];
			data.respond(
				"Team #" + data.message + " \"" + t.team_name + "\"\n" +
				"From: " + t.city + "," + t.region + "," + t.country + "\n" +
				"Organisation: " + t.organisation
			);
		}
	})
}
vexBot.commandUsage.team = "<team number>";
vexBot.commandDescs.team = "Gets information about a team";

vexBot.commands.score = function(data) {
	data.message = data.message.toUpperCase()
	vexdbGet("get_matches?season=Nothing%20But%20Net&team=" + encodeURIComponent(data.message),
		function(err, team_info) {
			if (team_info.status != 1 || !err) {
				data.respond("Could not find team");
			} else {
				var r = team_info.result;
				var tscore = 0;
				var matches = 0;
				var topscore = 0;

				for (var i = 0; i < r.length; i++) {
					if (
						r[i].red1 == data.message ||
						r[i].red2 == data.message ||
						r[i].red3 == data.message
					) {
						tscore += Number(r[i].redscore);
						topscore = Math.max(topscore, Number(r[i].redscore));
					} else {
						tscore += Number(r[i].bluescore);
						topscore = Math.max(topscore, Number(r[i].bluescore));
					}
					matches++;
				}

				data.respond(
					"Team #" + data.message + " in Nothing But Net\n" +
					"Matches : " + matches + "\n" +
					"Top score: " + topscore + "\n" +
					"Average score: " + Math.floor(tscore / matches)
				);
			}
		}
	)
}
vexBot.commandUsage.score = "<team number>";
vexBot.commandDescs.score = "Gets match score information about a team";

var crypto = require('crypto');

vexBot.commands.skills = function(data) {
	data.message = data.message.toUpperCase()
	if (crypto.createHash('md5').update(data.message).digest("hex") == "14bfa6bb14875e45bba028a21ed38046") { // just so you cant tell me i hardcoded it ;)
		return "None"
	}
	vexdbGet("get_skills?season=Nothing%20But%20Net&season_rank=true&team=" + encodeURIComponent(data.message),
		function(err, team_info) {
			if (team_info.status != 1 || !err) {
				data.respond("Could not find team");
			} else {
				var r = team_info.result;
				var tprog = 0;
				var trobo = 0;
				var rprog = 0;
				var rrobo = 0;

				for (var i = 0; i < r.length; i++) {
					if (Number(r[i].type) == 0) {
						trobo = Math.max(trobo, Number(r[i].score));
						rrobo = Number(r[i].season_rank);
					} else {
						tprog = Math.max(tprog, Number(r[i].score));
						rprog = Number(r[i].season_rank);
					}
				}

				data.respond(
					"Team #" + data.message + " in Nothing But Net\n" +
					"Programming : " + tprog + " ( #" + rprog + " in the world )\n" +
					"Driver : " + trobo + " ( #" + rrobo + " in the world )\n"
				);
			}
		}
	)
}
vexBot.commandUsage.skills = "<team number>";
vexBot.commandDescs.skills = "Gets skills score information about a team";

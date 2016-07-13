var http = require('http');
var unirest = require('unirest');

var tbaGet = function(url, cb) {
	var req = unirest.get("http://thebluealliance.com/api/v2/" + url)
		.headers({'User-Agent': 'RoBot v1.0.0 git.io/vohPQ', 'X-TBA-App-Id': 'harrison_freni:discord_bot:1' })
		.end(function(res) {
			if (res.statusType != 2) {
				cb(false, res.code);
			} else {
				cb(true, JSON.parse(res.raw_body));
			}
		});
};

vexBot.commands.frcteam = function(data) {
	tbaGet("team/frc" + data.message , function(err, team_info) {
        if(team_info.rookie_year) {
            data.respond(
				"Team #" + data.message + " \"" + team_info.nickname + "\"\n" +
				"From: " + team_info.location + "\n" +
                "Rookie Year: " + team_info.rookie_year + "\n" +
                "Website: " + team_info.website + "\n" +
                "Motto: " + team_info.motto
            );
        } else {
            data.respond("No team found with that number");
        }
	});
};
vexBot.commandUsage.frcteam = "<team number>";
vexBot.commandDescs.frcteam = "Gets information about a team";


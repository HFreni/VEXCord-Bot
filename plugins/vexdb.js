var http = require('http');

var vexdbGet = function(url, cb) {
	var options = {
		host: 'api.vexdb.io',
		path: '/v1/' + url,
		headers: {'User-Agent': 'RoBot v1.0.0 git.io/vohPQ'}
	};

	console.log("requesting \"" + options.path + "\"")

	callback = function(response) {
		var str = '';
		response.on('data', function(chunk) {
			str += chunk;
		});

		response.on('end', function () {
			console.log(str);
			cb(true, JSON.parse(str));
		});
		// why the @#$% isnt there a documented way of checking if it errors?
	}

	var req = http.request(options, callback);
	req.end();
};

vexBot.commands.vexdbraw = function(data) {
	vexdbGet(data.message, function(err, dat) {
		data.respond("```" + JSON.stringify(dat, null, 4) + "```");
	})
}

vexBot.commands.teaminfo = function(data) {
	vexdbGet("get_teams?team=" + encodeURIComponent(data.message), function(team_info) {
		if (team_info.status != 0) {
			data.respond("Could not find team");
		} else {
			var t = team_info[0];
			data.respond(
				"Team #" + data.message + "\n" +
				"From: " + t.city + "," + t.region + "," + t.country
			)
		}
	})
}

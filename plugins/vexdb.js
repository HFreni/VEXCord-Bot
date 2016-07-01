var http = require('http');

var vexdbGet = function(url, cb) {
	var options = {
		host: 'api.vexdb.io',
		path: 'v1/' + url,
		headers: {'User-Agent': 'RoBot v1.0.0 git.io/vohPQ'}
	};

	callback = function(response) {
		var str = '';
		response.on('data', function(chunk) {
			str += chunk;
		});

		response.on('end', function () {
			cb(true, JSON.parse(str));
		});
	}

	var req = http.request(options, callback);
	req.end();
};


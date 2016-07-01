var http = require('https');

// Stealing Andre's Code Cuz Why Not?!?
var definitionGet = function(url, cb) {
	var options = {
		host: 'mashape-community-urban-dictionary.p.mashape.com',
		path: '/' + url,
		headers: {"X-Mashape-Key": "WNsTcdAjW7mshAv0v8SOWo3FvoMgp1uUmXVjsn9FMLyYz4TCYN", "Accept" : "text/plain"}
	};//?term=

	console.log("requesting \"" + options.path + "\"");

	callback = function(response) {
		var str = '';
		response.on('data', function(chunk) {
			str += chunk;
		});

		response.on('end', function () {
			console.log(str);
			cb(true, JSON.parse(str));
		});
	};

	var req = http.request(options, callback);
	req.end();
};

vexBot.commands.define = function(data) {
	definitionGet("define?term=" + encodeURIComponent(data.message), function(err, definition) {
		var d = definition.list[0];
    if(definition.result_type == "no_results"){
      data.respond("There is no definition for the term: " + data.message);
    } else {
      //I'm so sorry, please don't hurt me.
      if (data.message.substring(0, 1) == 'a' || data.message.substring(0, 1) == 'e' || data.message.substring(0, 1) == 'i' || data.message.substring(0, 1) == 'o' || data.message.substring(0, 1) == 'u') {
        data.respond(
          "The Definition of an " + data.message + " is: " + d.definition + "\n" +
          "An Example of an " + data.message + " is: " + d.example
        );
      } else {
        data.respond(
          "The Definition of a " + data.message + " is: " + d.definition + "\n" +
          "An Example of a " + data.message + " is: " + d.example
        );
      }
    }
	});
};

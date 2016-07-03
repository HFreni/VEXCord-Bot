var unirest = require('unirest');

// This is the HTTP Request Method
// It grabs data from the mashape API for UD
var definitionGet = function(url, cb) {
	var req = unirest.get("https://mashape-community-urban-dictionary.p.mashape.com/" + url)
	.header("X-Mashape-Key", "2pRdiWPGH4mshPKKrehog6ntaVLCp1T7apvjsnq2zGRHATCGBl")
	.header("Accept", "text/plain")
	.end(function(res) {
		if (res.statusType != 2) {
			cb(false, res.code);
		} else {
			cb(true, JSON.parse(res.raw_body));
		}
	});
};

// Not the cleanest code, but it checks to see if a string is a
// vowel or not.
var vowelTest = function(s) {
	var check;
	var str = s.toUpperCase();
	check = str.startsWith("A") ||
			str.startsWith("E") ||
			str.startsWith("I") ||
			str.startsWith("O") ||
			str.startsWith("U") ;
	return check;
};

// This is the main command, It has basic error handling, and works well
// It prints out the first result from urban dictionary.
vexBot.commands.define = function(data) {
	definitionGet("define?term=" + encodeURIComponent(data.message), function(err, definition) {
		var d = definition.list[0];
    if(definition.result_type == "no_results"){
      data.respond("There is no definition for the term: " + data.message);
    } else {
      //I'm so sorry, please don't hurt me.
      if (vowelTest(data.message)) {
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
vexBot.commandUsage.define = "<word that needs definition>";
vexBot.commandDescs.define = "Gets the definition of a word from Urban Dictionary";

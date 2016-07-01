var toUnicode = require('to-unicode');

//var str = 'Fullwidth'
//var unicody = toUnicode(str, 'fullwidth')
//console.log(unicody.split("").reverse().join(""))

var toFullwidth = function(str) {
  var unicody = toUnicode(str, 'fullWidth');
  console.log(unicody.split("").join(""));
  return unicody.split("").join("");
};

vexBot.commands.fw = function(data) {
  data.respond(toFullwidth(data.message));
};

var toUnicode = require('to-unicode');

var str = 'Fullwidth'
var unicody = toUnicode(str, 'fullwidth')
console.log(unicody.split("").reverse().join(""))

vexBot.commands.fw = function(data) {
  
};

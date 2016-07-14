var http = require('http');
var unirest = require('unirest');

vexBot.commands.rulesearch = function(data) {
  data.message = data.message.toUpperCase()
  var req = unirest.get("rules.json")
    .end(function(res) {
      if (res.statusType != 2) {
        data.respond("Failed Request - Yell at Jonathan\nExit:"+res.raw_body);
      } else {
        res = JSON.parse(res.raw_body);
        var response = "Rule not found";
        for (var i = 0; i < res.rules.length; i++) {
          if(res.rules[i].number == data) {
            response = "" + res.rules[i].number + ": " +res.rules[i].text;
            for (var i = 0; i < res.rules[i].references.length; i++) {
              response+=  "\nThis rule references "+res.rules[i].references[i];
            }
          }
        }
        data.respond(reponse);
      }
    });
}
vexBot.commandUsage.rulesearch = "<rule number>";
vexBot.commandDescs.rulesearch = "Returns the specified rule";

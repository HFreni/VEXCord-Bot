var request = require('request');

// In order to separate our request, we must create a way to check for a list.
// Command Style:
// .poll <Poll Title>; <[ArrayOfOptions]>
// Regex for comma separation: /,(?=\w+:)/
var ids = [];
var idIndex = 0;

vexBot.commands.poll = function(data) {
    var lastStart = 0;
    numOfItems = 1;
    var pollOptions = [];
    for(var a = 0; a < data.message.length; a++) {
        if(data.message.charAt(a) == ',') {
            //console.log("True at: " + a);
            //console.log(data.message.substring(lastStart, a));
            pollOptions[numOfItems-1] = data.message.substring(lastStart, a);
            numOfItems++;
            lastStart = a+1;
        } else {
            //console.log("False at" + a);
        }
    }
    console.log(data.message.substring(lastStart, data.message.length));
    pollOptions[numOfItems-1] = data.message.substring(lastStart, data.message.length);
    console.log(pollOptions);

    var question = pollOptions[0];
    var finalOptions = [];
    for(var i = 1; i <= pollOptions.length -1; i++) {
        finalOptions[i-1] = pollOptions[i];
    }
    console.log(question);
    console.log(finalOptions);

    var poll = {title: question, options: finalOptions};
    request.post({
        url: 'https://strawpoll.me/api/v2/polls',
        followAllRedirects: true,
        body: poll,
        json: true
    }, function(err, res, body) {
        if(!err && res.statusCode == 200) {
            var d = body.id;
            ids[idIndex] = d;
            console.log(d);
            data.respond('http://www.strawpoll.me/' + d);
        }
    });
};
vexBot.commandUsage.poll = "<PollTitle>;<[ArrayOfOptions]>";
vexBot.commandDescs.poll = "Creates a new poll with Title: <PollTitle>, and Options: <[ArrayOfOptions]>";

vexBot.commands.results = function(data) {
    if(data.message > ids) {
        data.respond("You have requested poll results on a nonexistant poll");
    } else {
        var temp = ids[data.message];
        data.respond("http://www.strawpoll.me/" + temp + "/r");
    }
};
vexBot.commandUsage.results = "<PollNumber>";
vexBot.commandDescs.results = "Returns the poll results from poll: <PollNumber>";

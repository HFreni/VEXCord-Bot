var request = require('request');

// In order to separate our request, we must create a way to check for a list.
// Command Style:
// .poll <Poll Title>; <[ArrayOfOptions]>
// Regex for comma separation: /,(?=\w+:)/
vexBot.commands.poll = function(data) {
    for(var a = 0; a < data.message.length; a++) {
        if(data.message.includes(",", a) == true) {
            console.log("True at: " + a);
        } else {
            console.log("False at" + a);
        }
    }

    var poll = {title: data.message, options: ['Option 1', 'Option 2']};
    request.post({
        url: 'https://strawpoll.me/api/v2/polls',
        followAllRedirects: true,
        body: poll,
        json: true
    }, function(err, res, body) {
        if(!err && res.statusCode == 200) {
            var d = body.id;
            console.log(d);
            data.respond('http://www.strawpoll.me/' + d);
        }
    });
}
vexBot.commandUsage.poll = "<PollTitle>;<[ArrayOfOptions]>"
vexBot.commandDescs.poll = "Creates a new poll with Title: <PollTitle>, and Options: <[ArrayOfOptions]>"

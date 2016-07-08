var unirest = require('unirest');

var postPoll = function(pollTitle, pollOptions, cb) {
  var req = unirest.post("https://strawpoll.me/api/v2/polls/1")
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .send({"title": pollTitle,"options": ["Option #1","Option #2" ], "multi": false})
    .end(function(res) {
      if (res.statusType != 2) {
        cb(false, res.code);
      } else {
        cb(true, JSON.parse(res.raw_body));
      }
    });
}

vexBot.commands.vexdbraw = function(data) {
	postPoll(data.message, data.message, function(err, poll) {
    var d = poll.list[0];
    data.respond('http://www.strawpoll.me/' + poll.id)
  });
}

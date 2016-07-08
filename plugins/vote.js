var unirest = require('unirest');
var concat = require('concat-stream');
var strawpoll = require('strawpoll');

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

vexBot.commands.poll = function(data) {
  var stream = strawpoll({
    title: 'My first poll',
    options: [
      'wow',
      'awesome',
      'amazing',
      'nice'
    ],
    multi: false,
    permissive: true
  });

  stream.pipe(concat(function(poll) {
    poll = JSON.parse(poll);
    // poll.id is your poll's id
    // check out your poll at strawpoll.me/id
    data.respond('www.strawpoll.me/' + poll.id);
  }));
}

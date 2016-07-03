var requestNum = 0;

vexBot.commands.voteskip = function(data) {
  console.log("Skip Recieved");
  if(requestNum < 4) {
    requestNum+=1;
    data.respond(requestNum + "/4 people have voted to skip the current song");
  } else {
    data.respond("-skip");
    requestNum = 0;
  }
  console.log("Successfully Skipped")
};

// The goal of this module is to build in
// the ability to moderate the chat more efficiently.
// We will use this to keep track of current cases.
// DQs a user has on them, and much more.
// This will tie into the verification system, and thus
// create a way to track all sorts of user data, and allow
// us, the admins, to moderate the chat in a far more efficient way.
//
// Some examples of features:
// * Slow Mode
// * In-Chat DQ
// * Auto-Mute
// * Moderator Tools for Handling Cases.
// * Demote/Rank Up Users.
// * Kick/Ban Users
// * Force Skip Music <-- See musicplayer.js
// * Add/Remove data from the helpful links list.
var firebase = require('firebase');

// Initialize the app with no authentication
firebase.initializeApp({
    serviceAccount: process.env.VEXBOT_FIREBASE_KEY,
    databaseURL: "https://vexbot-668e9.firebaseio.com"
});


vexBot.commands.register = function(data) {
    var db = firebase.database();
    var ref = db.ref("/userData");
    ref.once("value", function(snapshot) {
        console.log(snapshot.val());
    });

    var usersRef = ref.child("users");
    usersRef.set({
        harri: {
            date_of_birth: "June 23, 1912",
            full_name: "Alan Turing"
        },andre: {
            date_of_birth: "December 9, 1906",
            full_name: "Grace Hopper"
        }
    });
};

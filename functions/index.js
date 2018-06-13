var database = require("botbuilder-storage-firebase-database");
const functions = require('firebase-functions');
const admin = require('firebase-admin');

var config = require("./conf")
admin.initializeApp(
    {
        databaseURL: config.databaseURL
    }
);
var db = admin.database();
var ref = db.ref("botState");

var client = new database.FireBaseBotStorage(ref, { refName: "botState" });



const fetch = require('node-fetch');

var botbuilder_linebot_connector_1 = require("botbuilder-linebot-connector");

var builder = require('botbuilder');


console.log("config", config)
var connector = new botbuilder_linebot_connector_1.LineConnector({
    hasPushApi: true,
    autoGetUserProfile: false,
    // your line
    channelId: process.env.channelId || config.channelId,
    channelSecret: process.env.channelSecret || config.channelSecret,
    channelAccessToken: process.env.channelAccessToken || config.channelAccessToken
});


var bot = new builder.UniversalBot(connector).set("storage", client);

bot.dialog("/", [s => {
    s.send("hello");

    s.beginDialog("greetings")
}
    , s => {
        s.send("bady")
    }

])
bot.dialog('greetings', [
    // Step 1
    function (session) {
        session.send(new builder.Message(session).addAttachment(new botbuilder_linebot_connector_1.Sticker(session, 1, 2)))
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    // Step 2
    function (session, results) {
        session.endDialog(`Hello ${results.response}!`);
    }
]);

exports.line = functions.https.onRequest(connector.listen());

exports.helloWorld = functions.https.onRequest((request, response) => {
    fetch('https://github.com/')
        .then(res => res.text())
        .then(body => console.log("body", body))
        .catch(er => console.log("er", er));
    response.send("Hello from Firebase!");
});
// const request = require('request');

// exports.helloWorld = functions.https.onRequest((req, res) => {
//     // Example input: {"message": "Hello!"}
//     if (req.body.message === undefined) {
//         // This is an error case, as "message" is required.
//         res.status(400).send('No message defined!');
//     } else {
//         // Everything is okay.
//         console.log(req.body.message);

//         request.get('https://maker.ifttt.com/trigger/arrival/with/key/xxxx', (error, response, body) => {
//             console.log('error:', error); // Print the error if one occurred 
//             console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
//             console.log('body:', body); //Prints the response of the request. 
//         });
//         res.status(200).send("Success");
//     }
// });

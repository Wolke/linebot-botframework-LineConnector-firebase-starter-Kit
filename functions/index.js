const functions = require('firebase-functions');
const fetch = require('node-fetch');

var botbuilder_linebot_connector_1 = require("botbuilder-linebot-connector");
var builder = require('botbuilder');


var config = require("./conf")
console.log("config", config)
var connector = new botbuilder_linebot_connector_1.LineConnector({
    hasPushApi: false,
    autoGetUserProfile: false,
    // your line
    channelId: process.env.channelId || config.channelId,
    channelSecret: process.env.channelSecret || config.channelSecret,
    channelAccessToken: process.env.channelAccessToken || config.channelAccessToken
});


var bot = new builder.UniversalBot(connector);
bot.dialog("/", [
    s => {
        s.send("hello")
        s.send(new builder.Message(s).addAttachment(new botbuilder_linebot_connector_1.Sticker(s, 1, 2)))
    },
    s => {
        s.send("bye")
        s.send(new builder.Message(s).addAttachment(new botbuilder_linebot_connector_1.Sticker(s, 1, 3)))
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

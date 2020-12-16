const brain = require("brain.js");
const fs = require("fs");
const chatbot = require("./chatbot.js");
const ms = require("ms");
var outs = [];
var version = "0.1";
var isEnded = false;
const bot = require("./bot.js");
bot.start();
function reboot(){
	bot.stop();
	bot = null;
	bot = require("./bot.js");
}

const express = require('express');

const app = express();
app.get('/', (req, res) => {
	if (req.query.raw == "true") {
		if (req.query.mode == "learn") {
			var bruh = "";
			chatbot.step(req.query.input, req.query.output, function(data) {
				bruh = data;
			});
			//When user teaches smth
			res.send(bruh);
		}
		else if (req.query.mode == "ask") {
			var result = "";
			chatbot.run(req.query.input, function(data) {
				result = data;
			});
			//When user asks smth
			res.send(result);
		}
		else if (req.query.mode == "masslearn") {
			res.send(`<h1>API Masslearn Function</h1>
			<form action="" method="GET" enctype="multipart/form-data">
			<input style="display:none" name="mode" value="massteach">
			<input style="display:none" name="raw" value="true">
			<textarea name="data" placeholder="input1 -> output1
input2 -> output2
etc..."></textarea>
<input type="submit" value="Send">
			</form>`)
		}
		else if (req.query.mode == "massteach") {
			var output = "Massteach Results";
			var args = req.query.data.toString().split("\n");
			args.forEach((arg) => {
				var inputs = arg.split(" -> ");
				chatbot.step(inputs[0], inputs[1], function(result) {
					output += "<br>" + result;
				});
			});
			res.send("<pre>" + output + "</pre><br><br><a href='https://ChatMan.martiaforoud.repl.co/?raw=true&mode=masslearn'>Back</a>");
		}
		else {
			//Just showing the page
			try {
				res.send("CHATMAN API");
			}
			catch {
				res.send("ERROR");
			}
		}
	}




























	else {
		//Just showing the page
		try {
			res.send(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"><title>Chatman</title><h1>Chatman - A.I</h1><hr><p>Hello! Thanks for checking out ChatMan! Unfortunately, chatman API is now only available for the ChatMan Services, which is currently our <a alt="Add him to your server!" href="https://discord.com/oauth2/authorize/?permissions=84992&scope=bot&client_id=786214618061340683">Discord Bot</a>. Click the <code>Discord Bot</code> text which is blue to add him to your server, or <a alt=":D" href="https://discord.gg/AARgH5a2">Join Our Server</a> to use him without clutter.</p>`);
		}
		catch {
			res.send(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"><h1>Seems like the System wasnt initialized.</h1><hr><p>There was an error so yeah, try again in like 2 mins pls :D</p>`);
		}
	}
});

app.listen(3000, () => {
	console.log('server started');
});

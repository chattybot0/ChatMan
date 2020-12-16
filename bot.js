const axios = require("axios");
const Discord = require("discord.js");
const ms = require("ms");
var bot;
const fs = require("fs");
var version = "3";

function setStuff() {
	try {
		//bot.user.setActivity(bot.guilds.cache.size + " servers - v" + version + " - hoping to get verified - does not collect messages - mention me for help", { type: "WATCHING" });
		bot.user.setActivity(bot.guilds.cache.size + " servers - v" + version + " - ~help", { type: "WATCHING" });
	}
	catch{

	}
}

async function disend(msg, args, time) {
	msg.channel.send(args).then((sent) => {
		setTimeout(function() {
			sent.delete();
		}, time);
	});
}

function init() {
	bot.on("ready", () => {
		console.log("ChatMan is online");
		setInterval(setStuff, 2000);
	});


	bot.on("message", (msg) => {
		const moderation = require("./moderation.js");
		moderation.check(msg, bot);
		if (msg.content.startsWith("~help")) {
			if (msg.content == "~help") {
				const embed = new Discord.MessageEmbed()
					.setTitle("Help Menu")
					.setDescription("Thanks for using ChatMan!\n**Moderation**: `~help mod`\n**Chatbot**: `~help chatbot`")
					.setColor([227, 9, 9])
					.setFooter("ChatMan Menus")
					.setTimestamp();
				disend(msg, embed, 20000);
			}
			else if(msg.content == "~help mod"){
				const embed = new Discord.MessageEmbed()
					.setTitle("Moderation Commands")
					.setDescription("**Ban**: `~ban <Mention a user to ban>`\n**Kick**: `~kick <Mention a user to kick>`\n**BulkDelete**: `~bdel <amount of messages to be deleted>`")
					.setColor([227, 9, 9])
					.setFooter("ChatMan Menus")
					.setTimestamp();
				disend(msg, embed, 20000);
			}
			else if (msg.content == "~help chatbot") {
				const embed = new Discord.MessageEmbed()
					.setTitle("ChatBot Commands")
					.setDescription("Hello!\nThanks for using me.\nI am an A.I chatbot and constantly learning form my master, and improving. so if you see weird responses like `hoihelloheheioioio` or `eo` or whatever, do not worry. it's just me learning and trying to make grammar. Learning to talk when you are less than 2 years old is not easy.\nI do not collect any data from my users or download the users list, so i would appreciate if you add me to your server.\n**Prefix**: I don't have a prefix, just mention me.\n**My Commands**:\n`~invite` -> Get my invite link.\nMention me and add a message like this: `@ChatMan hello` to talk with me. I am connected to the ChatMan API, developed by Mforoud86. You may like to check it out: https://chatman.martiaforoud.repl.co/\nNote: All messages auto-delete.")
					.setColor([227, 9, 9])
					.setFooter("ChatMan Menus")
					.setTimestamp();
				disend(msg, embed, 20000);
			}
		}

		else if (msg.content.startsWith("<@!786214618061340683> learn ")) {
			var args = msg.content.split("@!786214618061340683> learn")[1].split(" -> ");
			if (msg.author.id == "497695386513965056" || msg.author.id == "756360482108997692" || msg.author.id == "723055594403004458" || msg.author.id == "608675596305956919" || msg.author.id == "460644976808951808") {
				if (args.length > 1) {
					var url = "https://chatman.martiaforoud.repl.co/?mode=learn&input=" + encodeURI(args[0]) + "&output=" + encodeURI(args[1]) + "&raw=true";
					axios.get(url)
						.then((data) => {
							const embed = new Discord.MessageEmbed()
								.setTitle("Notice").setDescription("Data submission succeeded." + "\nTraining result:\n" + data.data.replace("<br>", "\n"))
								.setColor([227, 9, 9])
								.setFooter("ChatMan - Teach Mode")
								.setTimestamp();
							disend(msg, embed);
						})
						.catch((err) => {

							disend(msg, "Oops, seems like i have an error, i would appreciate it if you report it. :)\nError:\n" + err, ms("1m"));
						});
				}
				else {
					disend(msg, "Use teaching like this: `@ChatMan learn <input> -> <output>`", 5000);
				}
			}
			else {
				const embed = new Discord.MessageEmbed()
					.setTitle("You are not registered as a trainer.")
					.setColor([227, 9, 9])
					.setFooter("ChatMan")
					.setTimestamp();
				disend(msg, embed, 5000);

			}
		}
		else if (msg.content == "123 now restart") {
			if (msg.author.id == "497695386513965056" || msg.author.id == "756360482108997692" || msg.author.id == "723055594403004458" || msg.author.id == "608675596305956919" || msg.author.id == "460644976808951808") {
				msg.reply("Restarting....");
				restart();
			}
			else {
				const embed = new Discord.MessageEmbed()
					.setTitle("You are not registered as a trainer.")
					.setColor([227, 9, 9])
					.setFooter("ChatMan")
					.setTimestamp();
				disend(msg, embed, 5000);

			}
		}



		else if (msg.content.startsWith("ChatMan.FileLearn")) {
			var args = Buffer.from(msg.attachments.first().attachment).toString().split('\n');
			var mess = "";
			if (msg.author.id == "497695386513965056" || msg.author.id == "460644976808951808") {
				if (args.length > 0) {
					args.forEach((arg) => {
						var inputs = arg.split(' -> ');

						var url = "https://chatman.martiaforoud.repl.co/?mode=learn&input=" + encodeURI(inputs[0]) + "&output=" + encodeURI(inputs[1]) + "&raw=true";
						axios.get(url)
							.then((data) => {

								const embed = new Discord.MessageEmbed()
									.setTitle("Report").setDescription("Data submission succeeded." + "\nTraining result:\n" + data.data)
									.setColor([227, 9, 9])
									.setFooter("ChatMan - Teach Mode")
									.setTimestamp();
								disend(msg, embed, 20000);
							})
							.catch((err) => {
								disend(msg, "Oops, seems like i have an error, i would appreciate it if you report it. :)\nError:\n" + err, ms("1m"));
							});
					});
				}
				else {
					disend(msg, "Use fileteaching like this: `ChatMan.FileLearn File cotents:```<input> -> <output>\n<input2> -> <output2>\n<input3> -> <output3>\nand any amount of data you want.```\nNote: This feature is so beta and may cause problem. Not recommended at all.`", 10000);
				}
			}
			else {
				const embed = new Discord.MessageEmbed()
					.setTitle("You are not registered as a filetrainer.")
					.setColor([227, 9, 9])
					.setFooter("ChatMan")
					.setTimestamp();
				disend(msg, embed, 10000);
			}
		}

		else if (msg.content.startsWith("<@!786214618061340683> masslearn ")) {
			var args = msg.content.split("@!786214618061340683> masslearn")[1].split("\n");
			if (msg.author.id == "497695386513965056" || msg.author.id == "460644976808951808") {
				if (args.length > 1) {
					args.forEach((arg) => {
						var inputs = arg.split(' -> ');

						var url = "https://chatman.martiaforoud.repl.co/?mode=learn&input=" + encodeURI(inputs[0]) + "&output=" + encodeURI(inputs[1]) + "&raw=true";
						axios.get(url)
							.then((data) => {

								const embed = new Discord.MessageEmbed()
									.setTitle("Notice").setDescription(("Data submission succeeded." || "Data submission succeeded, but no data was provided, this is likely an error.") + "\nTraining result:\n" + data.data.replace("<br>", "\n"))
									.setColor([227, 9, 9])
									.setFooter("ChatMan - Teach Mode")
									.setTimestamp();
								disend(msg, embed, ms("1m"));
							})
							.catch((err) => {
								disend(msg, "1 args: " + arg + "\n\nArg: " + args, ms("1m"));
								disend(msg, "Oops, seems like i have an error, i would appreciate it if you report it. :)\nError:\n" + err, ms("1m"));
							});
					});
				}
				else {
					disend(msg, "Use mass teaching like this: `@ChatMan masslearn <input> -> <output>\n<input2> -> <output2>\n<input3> -> <output3>\nand any amount of data you want.\nNote: This feature is so beta and may cause problem. Not recommended at all.`", 10000);
				}
			}
			else {
				const embed = new Discord.MessageEmbed()
					.setTitle("You are not registered as a masstrainer.")
					.setColor([227, 9, 9])
					.setFooter("ChatMan")
					.setTimestamp();
				disend(msg, embed, 10000);
			}
		}


		else if (msg.content.startsWith("<@786214618061340683> masslearn ")) {
			var args = msg.content.split("@786214618061340683> masslearn")[1].split("\n");
			if (msg.author.id == "497695386513965056" || msg.author.id == "460644976808951808") {
				if (args.length > 1) {
					args.forEach((arg) => {
						var inputs = arg.split(' -> ');

						var url = "https://chatman.martiaforoud.repl.co/?mode=learn&input=" + encodeURI(inputs[0]) + "&output=" + encodeURI(inputs[1]) + "&raw=true";
						axios.get(url)
							.then((data) => {
								const embed = new Discord.MessageEmbed()
									.setTitle("Notice").setDescription(("Data submission succeeded." || "Data submission succeeded, but no data was provided, this is likely an error.") + "\nTraining result:\n" + data.data.replace("<br>", "\n"))
									.setColor([227, 9, 9])
									.setFooter("ChatMan - Teach Mode")
									.setTimestamp();
								disend(msg, embed, ms("1"));
							})
							.catch((err) => {
								disend(msg, "Oops, seems like i have an error, i would appreciate it if you report it. :)\nError:\n" + err, ms("1m"));
							});
					});
				}
				else {
					disend(msg, "Use mass teaching like this: `@ChatMan masslearn <input> -> <output>\n<input2> -> <output2>\n<input3> -> <output3>\nand any amount of data you want.\nNote: This feature is so beta and may cause problem. Not recommended at all.`", 10000);
				}
			}
			else {
				const embed = new Discord.MessageEmbed()
					.setTitle("You are not registered as a masstrainer.")
					.setColor([227, 9, 9])
					.setFooter("ChatMan")
					.setTimestamp();
				disend(msg, embed, 10000);
			}
		}











		else if (msg.content.startsWith("<@786214618061340683> learn ")) {
			var args = msg.content.split("@786214618061340683> learn")[1].split(" -> ");
			if (msg.author.id == "497695386513965056" || msg.author.id == "756360482108997692" || msg.author.id == "460644976808951808") {
				if (args.length > 1) {
					var url = "https://chatman.martiaforoud.repl.co/?mode=learn&input=" + encodeURI(args[0]) + "&output=" + encodeURI(args[1]) + "&raw=true";
					axios.get(url)
						.then((data) => {
							var urll = "https://chatman.martiaforoud.repl.co/?mode=ask&input=" + encodeURI(msg.content.split("@786214618061340683>")[1]) + "&raw=true";
							axios.get(urll)
								.then((dataa) => {
									const embed = new Discord.MessageEmbed()
										.setTitle("Notice").setDescription(("Data submission succeeded." || "Data submission succeeded, but no data was provided, this is likely an error.") + "\nTraining result:\n" + data.data.replace("<br>", "\n"))
										.setColor([227, 9, 9])
										.setFooter("ChatMan - Teach Mode")
										.setTimestamp();
									disend(msg, embed, ms("1m"));
								})
								.catch((err) => {
									disend(msg, "Oops, seems like i have an error, i would appreciate it if you report it. :)\nError:\n" + err, ms("1m"));
								});
						})
						.catch((err) => {
							disend(msg, "Oops, seems like i have an error, i would appreciate it if you report it. :)\nError:\n" + err, ms("1m"));
						});
				}
				else {
					disend(msg, "Use teaching like this: `@ChatMan learn <input> -> <output>`", 10000);
				}
			}
			else {
				const embed = new Discord.MessageEmbed()
					.setTitle("You are not registered as a trainer.")
					.setColor([227, 9, 9])
					.setFooter("ChatMan")
					.setTimestamp();
				disend(msg, embed, 10000);
			}
		}
		else if (msg.content.startsWith("~invite")) {
			disend(msg, "Bot's invite: https://discord.com/oauth2/authorize/?permissions=8&scope=bot&client_id=786214618061340683\nThe bot's support server:\nhttps://discord.gg/AARgH5a2", ms("1m"));
		}
		else if (msg.content.startsWith("<@!786214618061340683>")) {
			if (msg.content == "<@!786214618061340683>" || msg.content == "<@!786214618061340683> ") {

			}
			else {
				var url = "https://chatman.martiaforoud.repl.co/?mode=ask&input=" + encodeURI(msg.content.split("@!786214618061340683>")[1]) + "&raw=true";
				axios.get(url)
					.then((data) => {
						const embed = new Discord.MessageEmbed()
							.setTitle(data.data || "I do not know that.")
							.setColor([227, 9, 9])
							.setFooter("ChatMan")
							.setTimestamp();
						disend(msg, embed, ms("1m"));
					})
					.catch((err) => {
						disend(msg, "Oops, seems like i have an error, i would appreciate it if you report it. :)\nError:\n" + err, ms("1m"));
					});
			}
		}
		else if (msg.content.startsWith("<@786214618061340683>")) {
			if (msg.content == "<@786214618061340683>" || msg.content == "<@786214618061340683> " || msg.content == "<@786214618061340683>  ") {

			}
			else {
				var url = "https://chatman.martiaforoud.repl.co/?mode=ask&input=" + encodeURI(msg.content.split("@786214618061340683>")[1]) + "&raw=true";
				axios.get(url)
					.then((data) => {
						const embed = new Discord.MessageEmbed()
							.setTitle(data.data || "I do not know that.")
							.setColor([227, 9, 9])
							.setFooter("ChatMan")
							.setTimestamp();
						disend(msg, embed, ms("1m"));
					})
					.catch((err) => {
						disend(msg, "Oops, seems like i have an error, i would appreciate it if you report it. :)\nError:\n" + err, ms("1m"));
					});
			}
		}
	});
}

//WARNING: TOKEN IS DOWN THERE, DO NOT SCROLL DOWN ANYMORE.
//WARNING: TOKEN IS DOWN THERE, DO NOT SCROLL DOWN ANYMORE.
//WARNING: TOKEN IS DOWN THERE, DO NOT SCROLL DOWN ANYMORE.













function start() {
	bot = new Discord.Client();
	bot.login(process.env.TOKEN);
	init();
}

function stop() {
	clearInterval(setStuff);
	bot.user.setActivity("Restarting...");
	setTimeout(function() {
		bot.destroy();
	}, 5000);
}

module.exports = { start, stop };
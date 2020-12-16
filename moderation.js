const ms = require("ms");
const Discord = require("discord.js");

function checkPerm(msg, bot, perms) {
	if (msg.member.hasPermission(perms)) {
		return true;
	}
	else {
		return false;
	}
}

async function disend(msg, args, time) {
	msg.channel.send(args).then((sent) => {
		setTimeout(function() {
			sent.delete();
		}, time);
	});
}

async function diesend(msg, title, description, footer, time) {
	const embed = new Discord.MessageEmbed()
		.setTitle(title)
		.setDescription(description)
		.setColor([227, 9, 9])
		.setFooter(footer)
		.setTimestamp();
	disend(msg, embed, time);
}

function check(msg, bot) {
	if (msg.content.startsWith("~ban")) {
		if (checkPerm(msg, bot, 'BAN_MEMEBERS')) {
			try {
				msg.mentions.members.first().ban().then(() => {
					diesend(msg, "Success", "Member banned successfully.", "ChatMan Mod", ms("1m"));
					diesend(msg,"Oh Oh!","Seems like you got banned from" + msg.guild.name + ".","Clears in 1 day",ms("1d"));
				});
			}
			catch(err) {
				console.log(err);
				diesend(msg,"Whoops!","Seems like i do not have the permission to ban a user. Please give me the perms.","ChatMan Mod",ms("10s"));
			}
		}
		else {
			diesend(msg,"Whoops!","Seems like you do not have the permission to ban a user. Please stop trying.","ChatMan Mod",ms("10s"));
		}
	}
	else if (msg.content.startsWith("~kick")) {
		if (checkPerm(msg, bot, 'KICK_MEMEBERS')) {
			try {
				msg.mentions.members.first().kick().then(() => {
					diesend(msg, "Success", "Member kicked successfully.", "ChatMan Mod", ms("1m"));
					diesend(msg,"Oh Oh!","Seems like you got kicked from" + msg.guild.name + ".","Clears in 1 day",ms("1d"));
				});
			}
			catch(err) {
				diesend(msg,"Whoops!","Seems like i do not have the permission to kick a user. Please give me the perms.","ChatMan Mod",ms("10s"));
			}
		}
		else {
			diesend(msg,"Whoops!","Seems like you do not have the permission to kick a user. Please stop trying.","ChatMan Mod",ms("10s"));
		}
	}
	else if(msg.content.startsWith("~bdel")){
		if(checkPerm(msg,bot,"MANAGE_MESSAGES")){
			try {
				msg.channel.bulkDelete(msg.content.replace("~bdel ","")).then((messages) => {
					diesend(msg,"Done!",`I have deleted ${messages.size} messages!`,"ChatMan Mod",ms("10s"));
				});
			}
			catch(err) {
				diesend(msg,"Whoops!","Seems like i do not have the permission to bulk delete messages. Please give me the perms.","ChatMan Mod",ms("10s"));
			}
		}
		else {
			diesend(msg,"Whoops!","Seems like you do not have the permission to bulk delete messages. Please stop trying.","ChatMan Mod",ms("10s"));
		}
	}
}

module.exports = { check };
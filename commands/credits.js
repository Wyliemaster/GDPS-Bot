const Discord = require("discord.js")
const botconfig = require("../botsettings.json");


module.exports.run = async (bot, message, args) => {
const credits = new Discord.MessageEmbed()
.setTitle('GDPS Bot by Wylie')
.setURL('https://github.com/Wyliemaster/GDPS-Bot')
.addField('Credits', '[GDColon](https://github.com/GDColon) for giving me tips to write this and for letting me use a bit of GDBrowsers parsing algorithm \n[RealstikDash](https://github.com/RealistikDash) for helping me with user inputs and server stuff')
.setColor('0x' + botconfig.commandColour)
message.channel.send(credits)
}


module.exports.config = {
    name: "credits",
    description: "Credits to people who have helped me with the development",
    usage: botconfig.prefix +"credits",
    accessableby: "Members",
    aliases: []
}
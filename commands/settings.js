const Discord = require("discord.js")
const botconfig = require("../botsettings.json");


module.exports.run = async (bot, message, args) => {
    message.channel.send('**__Here are the settings__** \nserver: `' + botconfig.server + '`\nPrefix: `' + botconfig.prefix + '`')
}


module.exports.config = {
    name: "settings",
    description: "Fetches the profile data for the accounts you search",
    usage: botconfig.prefix + "settings",
    accessableby: "Members",
    aliases: ['s']
}
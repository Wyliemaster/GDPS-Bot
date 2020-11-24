const Discord = require("discord.js");
const botconfig = require("../botsettings.json");

module.exports = bot => {
    console.log(`${bot.user.username} is online`)
    bot.user.setActivity(botconfig.customStatus, {type: "PLAYING"})
}
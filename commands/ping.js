const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const request = require('request');

module.exports.run = async (bot, message, args) => {
request.get('http://' + botconfig.server + '/incl/lib/connection.php', function callback(httpResponse, err, body){
    if(err['statusCode'] == 404){
        message.reply(err['statusCode'] + ' ' + err['statusMessage'] + '\nCannot find Connection.php. Check console for more details')
        console.log("if you get this message, it means that you haven't set up the config correctly, please add your server to the config")
}   else if(err['statusCode'] != 200){
    message.reply( err['statusCode'] + ' ' + err['statusMessage'] + '\nServers are down')
}
    else {
        message.reply(err['statusCode'] + ' ' + err['statusMessage'] + '\nServers are fine!')
    }
} )
}



module.exports.config = {
    name: "ping",
    description: "checks if server is online",
    usage: botconfig.prefix + "ping",
    accessableby: "Members",
    aliases: []
}
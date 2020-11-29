const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const request = require('request');

module.exports.run = async (bot, message, args) => {

if(botconfig.leaderboardOn != '1'){return message.channel.send('Command is disabled').then(() => {
 bot.destroy();
bot.login(botconfig.token);
})
}

function xor (key, string) {
        var result = "";
        for (var index = 0; index < string.length; index++) {
          var input = string.charCodeAt(index);
          var keys = key.charCodeAt(index % key.length);
          result += String.fromCharCode(input ^ keys);
        }
        return result;
      }

var arg;
regex = message.content.replace(/ /g, '_');
if(regex.includes('_')){
arg = message.content.split(' ')[1]
} else {
    arg = 'stars';
}
var type;
switch(arg){
    //stars
    case 'stars':
        type = 'top'
        break;
    case 'star':
        type = 'top'
        break;
    case 'top':
        type = 'top'
        break;
    case '100':
        type = 'top'
        break;
    case 's':
        type = 'top'
        break;
    case 'player':
        type = 'top'
        break;

    //creators
    case 'creator':
        type = 'creators'
        break;
    case 'cp':
        type = 'creators'
        break;
    case 'c':
        type = 'creators'


    default:
        type = 'top'
        break;
    }
xord = xor('37526', botconfig.BotPassword)
buff = new Buffer.from(xord)
let GJP = buff.toString('base64');


request.post('http://' + botconfig.server + '/getGJScores20.php', {
form: {
type: type,
secret: 'Wmfd2893gb7',
count: 20,
accountID: botconfig.BotAccountID,
gjp: GJP,
gameVersion: 21,
binaryVersion: 35,
gdw: 0
}
}, function callback(err, httpResponse, body) {
if(body == '-1'){
return message.channel.send('There seems to be an error, please try again later \n\n[ERROR CODE] ' + body ).then(() => {
bot.destroy();
bot.login(botconfig.token);
})
}



split = body.split('|')
let top20 = [];

    parseResponse = function (responseBody, splitter) {
        if (!responseBody || responseBody == "-1") return {};
        let response = responseBody.split('#')[0].split(splitter || ':'); //special thanks to colon for letting me use this
        let res = {};
        for (let i = 0; i < response.length; i += 2) {
        res[response[i]] = response[i + 1]}
        return res  }

for (let index = 0; index < 20; index++) { //top 20 is good for now
top20.push(parseResponse(split[index]))
}
console.log(top20)
console.log('name: ' + top20[5][1])

switch(type){
    case 'top':
        title = '__Star '
        stat = 3
        emote = botconfig.star
        break;
    case 'creators':
        title = '__Creator '
        stat = 8
        emote = botconfig.cp
        break;
    default:
        title = '__Star '
        stat = 3
        emote = botconfig.star
}
console.log(stat)
let rank;
let fields = [];
console.log(fields[0])
const leaderboard = new Discord.MessageEmbed()
    .setTitle(title + 'Leaderboard__')
    .setColor('0x' + botconfig.commandColour)
    .setFooter(Date())
for (let i = 0; i < 20; i++) {
    e=i+1
leaderboard.addField('Top ' + e + ' - ' + top20[i][1], emote + ' ' + top20[i][stat])    
}
message.channel.send(leaderboard)



})
}

module.exports.config = {
    name: "leaderboard",
    description: "displays the ingame Leaderboard",
    usage: botconfig.prefix +"leaderboard",
    accessableby: "Members",
    aliases: ['lb']
}
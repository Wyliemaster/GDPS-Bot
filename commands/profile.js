const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const request = require('request');

module.exports.run = async (bot, message, args) => {
    let user
    str = message.content
    user = str
request.post('http://'+ botconfig.server + '/getGJUsers20.php', {
form: {
    gameVersion: 21,
    binaryVersion: 35,
    gdw: 0,
    str: (user).split(' ')[1],
    total: 0,
    page: 0,
    secret: "Wmdf2893gb7"
}


},function callback(err, httpResponse, body) {
   if(body === '-1'){
    console.log('[LOG] ERROR: Profile can not be found - ' + body)
    return message.channel.send('The Profile you are searching for can not be found').then(() => {
        bot.destroy();
        bot.login(botconfig.token);
        }); 
}

prefixLength = botconfig.prefix.length
if(message.content.length < 8 + prefixLength){
    console.log('[LOG] ERROR: message too short - -2') 
    return message.channel.send('The Profile you are searching for can not be found').then(() => {
        bot.destroy();
        bot.login(botconfig.token);
})
}
  parseResponse = function (responseBody, splitter) {
    if (!responseBody || responseBody == "-1") return {};
    let response = responseBody.split('#')[0].split(splitter || ':'); //special thanks to colon for letting me use this
    let res = {};
    for (let i = 0; i < response.length; i += 2) {
    res[response[i]] = response[i + 1]}
    return res  }
    var userData = parseResponse(body)

  let data = {
       username: userData[1],
       userID: userData[2],
       secretCoins: userData[13],
       userCoins: userData[17],
       icons: userData[9],
       colour1: userData[10],
       colour2: userData[11],
       accountID: userData[16],
       stars: userData[3],
       creatorPoints: userData[8],
       Demons: userData[4]
    }
   
request.post('http://'+ botconfig.server + '/getGJUserInfo20.php', {
        form: {
        targetAccountID: userData[16],
        gjp: "gjp" //cvolton why? lmao
        }
        
        
        },function callback(err, httpResponse, body) {
           parseResponse = function (responseBody, splitter) {
            if (!responseBody || responseBody == "-1") return {};
            let response = responseBody.split('#')[0].split(splitter || ':'); //special thanks to colon for letting me use this
            let res = {};
            for (let i = 0; i < response.length; i += 2) {
            res[response[i]] = response[i + 1]}
            return res  }
            
        var userData = parseResponse(body)
        
           let data = {
            username: userData[1],
            playerID: userData[2],
            accountID: userData[16],
            rank: userData[30],
            stars: userData[3],
            diamonds: userData[46],
            coins: userData[13],
            userCoins: userData[17],
            demons: userData[4],
            cp: userData[8],
            moderator: userData[49],
            icon: userData[21],
            ship: userData[22],
            ball: userData[23],
            ufo: userData[24],
            wave: userData[25],
            robot: userData[26],
            spider: userData[43],
            col1: userData[10],
            col2: userData[11],
            deathEffect: userData[48],
            youTube: userData[20],
            twitter: userData[44],
            twitch: userData[45]
            }
var mod
            switch (userData[49]) {
                case '2':
                    mod = botconfig.elderMod + ' '
                    break;
                case '1':
                    mod = botconfig.mod + ' '
                    break
                    default:
                    mod = ''
            }

if(data['youTube'] == ''){
    youtube = 'None'
} else if(data['youTube'].length < 15){
    youtube = '[YouTube](https://www.youtube.com/c/' + data['youTube'] + ')'
}else{ 
    youtube = '[YouTube](https://www.youtube.com/channel/' + data['youTube'] + ')'
}

if(data['twitch'] == ''){
    twitch = 'None'
}
else {
    twitch = '[' + data['twitch'] + '](https://twitch.tv/' + data['twitch'] + ')'
}
if(data['twitter'] == ''){
    twitter = 'None'
} else {
    twitter = '[@' + data['twitter'] + '](https://twitter.com/' + data['twitter'] + ')'
}


            const playerSearch = new Discord.MessageEmbed()
            .setTitle(mod + '**' + data['username'] + '**')
            .addField('__Leaderboard Rank__', botconfig.leaderboardRank + ' ' + data['rank'])
            .addField('__Stats__', botconfig.star + ' ' + data['stars'] + '\n' + botconfig.diamond + ' ' + data['diamonds'] + '\n' + botconfig.goldCoin + ' ' + data['coins'] + '\n' + botconfig.silverCoin + ' ' + data['userCoins'] + '\n' + botconfig.demon + ' ' + data['demons'] + '\n' + botconfig.cp + ' ' + data['cp'])
            .addField('__Links__', 'YouTube: ' + youtube + '\nTwitter: ' + twitter + '\nTwitch: ' + twitch)
            .setFooter('AccountID: ' + data['accountID'] + '  |  ' + 'UserID: ' + data['playerID'])
            .setColor('0x' + botconfig.commandColour)
            message.channel.send(playerSearch)
                })
            })  
}


module.exports.config = {
    name: "profile",
    description: "Fetches the profile data for the accounts you search",
    usage: botconfig.prefix + "profile",
    accessableby: "Members",
    aliases: ['player']
}
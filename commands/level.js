const Discord = require("discord.js")
const botconfig = require("../botsettings.json");
const request = require('request');
const xor = require('base64-xor');

module.exports.run = async (bot, message, args) => {
    level = message.content
    cmdsplit = (message.content).split(' ')[0]
    test = level.replace(/ /g, '_')
    levelreq = test.split(cmdsplit + '_')[1]
    request.post('http://' + botconfig.server + '/getGJLevels21.php', {
        form: {
            gameVersion: 21,
            binaryVersion: 35,
            gdw: 0,
            type: 0,
            str: levelreq,
            diff: "-",
            page: 0,
            total: 0,
            uncompleted: 0,
            onlyCompleted: 0,
            featured: 0,
            original: 0,
            twoPlayer: 0,
            coins: 0,
            epic: 0,
            secret: "Wmdf2893gb7",
            count: 1
        } 
        }, function callback(err, httpResponse, body) {

            if(body === '###0:00:10#-1'){
                console.log('[LOG] ERROR: Level does not exist - ' + body)
                return message.channel.send('The Level you are searching for can not be found').then(() => {
                    bot.destroy();
                    bot.login(botconfig.token);
                    }); 
                }

            parseResponse = function (responseBody, splitter) {
                if (!responseBody || responseBody == "-1") return {};
                let response = responseBody.split('#')[0].split('|')[0].split(splitter || ':'); //special thanks to colon for letting me use this
                let res = {};
                for (let i = 0; i < response.length; i += 2) {
                res[response[i]] = response[i + 1]}
                return res  }
                var levelData = parseResponse(body)


                let data = {
                    levelID: levelData[1],
                    levelName: levelData[2],
                    description: levelData[3],
                    version: levelData[5],
                    playerID: levelData[6],
                    difficulty: levelData[9],
                    download: levelData[10],
                    officialSong: levelData[12],
                    gameVersion: levelData[13],
                    likes: levelData[14],
                    length: levelData[15],
                    demon: levelData[17],
                    stars: levelData[18],
                    featured: levelData[19],
                    auto: levelData[25],
                    uploadDate: levelData[27],
                    updateDate: levelData[29],
                    copied: levelData[30],
                    twoPlayer: levelData[31],
                    customSong: levelData[35],
                    coins: levelData[37],
                    verifiedCoins: levelData[38],
                    epic: levelData[42],
                    demondiff: levelData[43],
                    objects: levelData[45],
                }
                switch(levelData[12]){
                    case '0':
                        ng = '[Stereo Madness](https://www.youtube.com/watch?v=JhKyKEDxo8Q)'
                        break;
                    case '1':
                        ng = '[Back On Track](https://www.youtube.com/watch?v=N9vDTYZpqXM)'
                        break;
                    case '2':
                        ng = '[Polargeist](https://www.youtube.com/watch?v=4W28wWWxKuQ)'
                        break;
                    case '3':
                        ng = '[Dry Out](https://www.youtube.com/watch?v=FnXabH2q2A0)'
                        break;
                    case '4':
                        ng = '[Base After Base](https://www.youtube.com/watch?v=TZULkgQPHt0)'
                        break;
                    case '5':
                        ng = "[Can't Let Go](https://www.youtube.com/watch?v=fLnF-QnR1Zw)"
                        break;
                    case '6':
                        ng = '[Jumper](https://www.youtube.com/watch?v=ZXHO4AN_49Q)'
                        break;
                    case '7':
                        ng = '[Time Machine](https://www.youtube.com/watch?v=zZ1L9JD6l0g)'
                        break;
                    case '8':
                        ng = '[Cycles](https://www.youtube.com/watch?v=KDdvGZn6Gfs)'
                        break;
                    case '9':
                        ng = '[Xstep](https://www.youtube.com/watch?v=PSvYfVGyQfw)'
                        break;
                    case '10':
                        ng = '[Clutterfunk](https://www.youtube.com/watch?v=D5uJOpItgNg)'
                        break;
                    case '11':
                        ng = '[Theory Of Everything](https://www.newgrounds.com/audio/listen/354826)'
                        break;
                    case '12':
                        ng = '[Electroman Adventures](https://www.youtube.com/watch?v=Pb6KyewC_Vg)'
                        break;
                    case '13':
                        ng = '[Clubstep](https://www.newgrounds.com/audio/listen/396093)'
                        break;
                    case '14':
                        ng = '[Electrodynamix](https://www.newgrounds.com/audio/listen/368392)'
                        break;
                    case '15':
                        ng = '[Hexagon Force](https://www.youtube.com/watch?v=afwK743PL2Y)'
                        break;
                    case '16':
                        ng = '[Blast Processing](https://www.youtube.com/watch?v=Z5RufkDHsdM)'
                        break;
                    case '17':
                        ng = '[Theory Of Everything 2](https://www.youtube.com/watch?v=fn98711CEoI)'
                        break;
                    case '18':
                        ng = '[Geometrical Dominator](https://www.youtube.com/watch?v=MQ7vI7cdYJY)'
                        break;
                    case '19':
                        ng = '[Deadlocked](https://www.youtube.com/watch?v=QRGkFkf2r0U)'
                        break;
                    case '20':
                        ng = '[Fingerdash](https://www.youtube.com/watch?v=BuPmq7yjDnI)'
                        break;
                        default:
                            console.log('[LOG] ERROR: song does not exist - Server Response: ' + levelData[12])
                        ng = '[Unknown](https://www.youtube.com/watch?v=oHg5SJYRHA0)'
                        break;                
                }
        
songParse = function (responseBody, splitter) {
if (!responseBody || responseBody == "-1") return {};
let response = responseBody.split('#')[0].split(splitter || ':'); //stupid bug :(
let res = {};
for (let i = 0; i < response.length; i += 2) {
res[response[i]] = response[i + 1]}
return res  }

songTrim = body.split('#')[2] //Credits to Colon and a few members from GDP for explaining what i need to do for this
song = songParse(songTrim, '~|~')
let songData = {
    songID: song[1],
    songName: song[2],
    authorID: song[3],
    authorName: song[4],
    songSize: song[5],
    songURL: song[10]
}
var download = ''
if(song[1] > 0){
finalURL = decodeURIComponent(song[10]) //i was stupid, thanks colon for telling me i used the wrong one
ng = '[**' + song[2] + '**](https://www.newgrounds.com/audio/listen/' + song[1] + ') by [**' + song[4] + '**](https://' + song[4] + '.newgrounds.com/audio)'
download = '[Download Song](' + finalURL + ')'
}

switch(levelData[37]){ //Silver Coins
    case '1':
        coins = botconfig.silverCoin
        break;
    case '2':
        coins = botconfig.silverCoin + botconfig.silverCoin
        break;
    case '3':
        coins = botconfig.silverCoin + botconfig.silverCoin + botconfig.silverCoin
        break;
    default:
        coins = 'No Coins'
        break;
}
switch(levelData[15]){ // Length
    case '0':
        length = 'tiny'
        break;
    case '1':
        length = 'short'
        break;
    case '2':
        length = 'Medium'
        break;
    case '3':
        length = 'Long'
        break;
    case '4':
        length = 'XL'
        break;
    default:
        length = 'Unknown'
}
switch(levelData[9]){ // difficulty faces
case '0':
    difficulty = 'https://media.discordapp.net/attachments/753349180885565481/781979485729194004/NA.png'
    break;
case '10':
    difficulty = 'https://media.discordapp.net/attachments/753349180885565481/781979805351804938/Easy.png'
break;
case '20':
    difficulty = 'https://media.discordapp.net/attachments/753349180885565481/781982183648395264/Normal.png'
    break;
case '30':
    difficulty = 'https://media.discordapp.net/attachments/753349180885565481/781982140866625596/Hard.png'
    break;
case '40':
    difficulty = 'https://media.discordapp.net/attachments/753349180885565481/781982184834727986/Harder.png'
    break;
case '50':
    difficulty = 'https://media.discordapp.net/attachments/753349180885565481/781982178488877056/Insane.png'
    break
default:
    difficulty = 'https://media.discordapp.net/attachments/753349180885565481/781979485729194004/NA.png';
    break;
}
if(levelData[25] == 1){
    difficulty = 'https://media.discordapp.net/attachments/753349180885565481/781979850093232168/auto.png'
}
else if(levelData[17] == 1){
    switch(levelData[43]){
        case '3':
            difficulty = 'https://media.discordapp.net/attachments/753349180885565481/781981543044218911/easyDemon.png' //easy demon
            break;
        case '4':
            difficulty = 'https://media.discordapp.net/attachments/753349180885565481/781981789744922624/mediumDemon.png' //medium demon
            break;
        case '5':
            difficulty = 'https://media.discordapp.net/attachments/753349180885565481/781981807209087017/insaneDemon.png' // insane demon
            break;
        case '6':
            difficulty = 'https://media.discordapp.net/attachments/695600063652560976/781982171724382230/Extreme_Demon.png' // extreme demon
            break;
        default:
            difficulty = 'https://media.discordapp.net/attachments/753349180885565481/781981292643352606/hardDemon.png' // hard demon
            break;
    }
}

if(levelData[19] > 0){ // is level Featured?
    switch(levelData[9]){
        case '0':
            difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782663025697357824/naFeature.png'
            break;
        case '10':
            difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782665587737493534/easyFeature.png'
        break;
        case '20':
            difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782665716410220594/normalFeature.png'
            break;
        case '30':
            difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782665592582701066/hardFeature.png'
            break;
        case '40':
            difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782665591164764180/harderFeature.png'
            break;
        case '50':
            difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782665595753332736/insaneFeature.png'
            break
        default:
            difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782663025697357824/naFeature.png';
            break;
        }
        if(levelData[25] == 1){
            difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782665584315072523/autoFeature.png'
        }
        else if(levelData[17] == 1){
            switch(levelData[43]){
                case '3':
                    difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782665589306294292/eDemonFeature.png' //easy demon
                    break;
                case '4':
                    difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782665715059916840/mDemonFeature.png' //medium demon
                    break;
                case '5':
                    difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782665594708951070/iDemonFeature.png' // insane demon
                    break;
                case '6':
                    difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782665588983464006/exDemonFeature.png' // extreme demon
                    break;
                default:
                    difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782665585246994442/DemonFeature.png' // hard demon
                    break;
            }
        }


}

if(levelData[42] > 0){ // is level epic?
    switch(levelData[9]){
        case '0':
            difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782668848967974932/naEpic.png'
            break;
        case '10':
            difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782668780522176572/easyEpic.png'
        break;
        case '20':
            difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782668850675056640/normalEpic.png'
            break;
        case '30':
            difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782668789367963658/hardEpic.png'
            break;
        case '40':
            difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782668791648616508/harderEpic.png'
            break;
        case '50':
            difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782668796036775966/insaneEpic.png'
            break
        default:
            difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782668848967974932/naEpic.png';
            break;
        }
        if(levelData[25] == 1){
            difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782668777153626112/autoEpic.png'
        }
        else if(levelData[17] == 1){
            switch(levelData[43]){
                case '3':
                    difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782668782924464148/eDemonEpic.png' //easy demon
                    break;
                case '4':
                    difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782668846892056576/mDemonEpic.png' //medium demon
                    break;
                case '5':
                    difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782668793981173760/iDemonEpic.png' // insane demon
                    break;
                case '6':
                    difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782668785101307924/exDemonEpic.png' // extreme demon
                    break;
                default:
                    difficulty = 'https://media.discordapp.net/attachments/753349180885565481/782668778655449128/demonEpic.png' // hard demon
                    break;
            }
        }


}




    let desc = levelData[3];
    let buff = new Buffer.from(desc, 'base64');
    let description = buff.toString('ascii');
    if(levelData[3] == ''){
        description = 'No Description Found'
    }

var varsong =  ng + '\n' + download
if(song[4] == 'Reupload'){
    varsong = '[**' + song[2] + '**](' + finalURL + ') by [**' + song[4] + '**](https://' + song[4] + '.newgrounds.com/audio)' // messy :()
}


request.post('http://' + botconfig.server + '/downloadGJLevel22.php', {
    form: {
        gameVersion: 21,
        binaryVersion: 35,
        gdw: 0,
        levelID: levelData[1],
        secret: "Wmdf2893gb7",
    } 
    }, function callback(err, httpResponse, body) {

        if(body === '###0:00:10#-1'){
            return message.channel.send('The Level you are searching for can not be found').then(() => {
                bot.destroy();
                bot.login(botconfig.token);
                }); 
            }
            newLevelData = parseResponse(body)
            let data = {
                password: newLevelData[27]
            }
var lvlPass 
if (newLevelData[27] == '0') {
    lvlPass = 'Not Copyable'
} else {
lvlPass = xor.decode('26364', newLevelData[27]);
    if(lvlPass == '1'){
        lvlPass = 'Free Copy'
    }
}
if(lvlPass.length > 1)
    lvlPass = lvlPass.replace('1', '')
        
    lvlPass = '||' + lvlPass + '||'
                const LevelSearch = new Discord.MessageEmbed()
                .setTitle('__' + levelData[2] + '__')
                .setThumbnail(difficulty)
                .addField('__Level Description__', description)
                .addField('__Level Stats__', botconfig.star + ' ' +  levelData[18] + '\n' + botconfig.download + ' ' + levelData[10] + '\n' + botconfig.like + ' ' + levelData[14] + '\n' + botconfig.length + ' ' + length)
                .addField('__Coins__', coins)
                .addField('__Level Pass__', lvlPass)
                .addField('__Song__', varsong)
                .setFooter('Level ID: ' + levelData[1] + ' | Level Version : ' + levelData[5])
                .setColor('0x' + botconfig.commandColour)
                message.channel.send(LevelSearch)
        })
})
}


0
module.exports.config = {
    name: "level",
    description: "Fetches the data for the levels you search",
    usage: botconfig.prefix + "level",
    accessableby: "Members",
    aliases: ['l']
}
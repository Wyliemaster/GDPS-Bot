# GDPS-Bot
a GDPS bot that ive been working on, planning to implement more features in the near future

# What does this GDPS Bot do?
This GDPS Bot currently has 2 main commands

  - profile
  - level
  
  these commands fetch information from your GDPS and displays them in a discord embed as shown in the examples below

![profile command example](https://cdn.discordapp.com/attachments/755460924000829460/757642519264755732/1.png)

![level command example](https://cdn.discordapp.com/attachments/755460924000829460/757642612864843867/2.png)

# Setup
firstly, you need to configure the config which can be found [here](https://github.com/Wyliemaster/GDPS-Bot/blob/master/botsettings.json). the image below shows the important parts of the config.

- The bot token is what is used to make your bot work on discord. you can get the token for a bot [here](https://discord.com/developers/applications)
- The Prefix is what you use to use commands. For example, making the prefix ``x!`` will make it so the commands will be triggered like this: ``x!profile``, ``x!level``
- the server is what server the bot works for.

![config](https://cdn.discordapp.com/attachments/707934709178695701/757328595285704774/unknown.png)

# Emotes

to get emotes working on the bot, you will need to add them yourself. upload the emotes you want to use then you use ``\:emote:`` to find the ID of your emote. once you get the id, just copy and paste the entire emote ID into the config. emote ID's look like this: ``<:diamond:694900098836070440>``

![how to find emote IDs](https://cdn.discordapp.com/attachments/707934709178695701/757331811675144292/unknown.png)

once you get the emoteID of the emote you want to add, all you do is copy and paste it into the config and it will work once you use the bot

![emote config](https://cdn.discordapp.com/attachments/707934709178695701/757332054600843394/unknown.png)


# Getting the bot online

The setup is quite easy. just upload this repository on your github account with the settings configured then you use [heroku to host the bot.](https://www.youtube.com/watch?v=8qIsRzV0Hpg). 

No Need to worry about making the [Profile](https://github.com/Wyliemaster/GDPS-Bot/blob/master/Procfile), I made on in advance. all you need to do is host the repository on heroku and enable workers and then the bot should be functional

# Need some support?

if you need any help with the set up, you can ask me in my GDPS which is also the [GDPS Bot discord server](https://discord.gg/r5KW2bR)

const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
//const rp = require('request-promise');
const cheerio = require('cheerio');
const Gamedig = require('gamedig');
var onlineplayers = "24/7 Imperial RP"
client.on('ready', () => {
    console.log('I am ready!');
});


function sendrequest(){
    console.log("Sent request to server")
    Gamedig.query({
    type: 'garrysmod',
    host: '96.30.193.219',
    port: '27015'
    }).then((state) => {
        if (state.players.length == 1){
            onlineplayers = state.players.length + " Player Online"
        } else {
            onlineplayers = state.players.length + " Players Online"
        }
    }).catch((error) => {
    onlineplayers = "SERVER OFFLINE"
    });
}

//client.on('guildMemberAdd', member => {
//  member.addRole("561027558423003137")
//  .then(console.log("Roled member"))
//  .catch(console.error);
//});

function updatename(){
  client.user.setActivity('24/7 Imperial RP', { type: 'STREAMING', url: 'https://www.twitch.tv/urmom'})
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);
}

function updateplayers(){
  client.user.setActivity(onlineplayers, { type: 'STREAMING', url: 'https://www.twitch.tv/urmom'})
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);
}

function editmessage(){
    message.channel.fetchMessages({around: '662015148671631381', limit: 1})
    .then(msg => {
        const fetchedMsg = msg.first();
        fetchedMsg.edit("test");
    });
}

client.on('message', message => {
    // If the message is '!rip'
    if (message.content === '!rips') {
        //editmessage()
        //message.channel.send("hi");
    }
});

sendrequest() // at init so it shows the player count for the first 100 seconds
setInterval(sendrequest, 100000)
setInterval(updatename, 10000);
setInterval(updateplayers, 4600);

client.login(process.env.BOT_NEW);

const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
//const rp = require('request-promise');
const cheerio = require('cheerio');
const Gamedig = require('gamedig');
var onlineplayers = "24/7 Imperial RP"
var map = "N/A"
client.on('ready', () => {
    console.log('I am ready!');
});

//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => {
 //   console.log(`Our app is running on port ${ PORT }`);
//});

function sendrequest(){
    console.log("Sent request to server")
    Gamedig.query({
    type: 'garrysmod',
    host: '96.30.193.219',
    port: '27015'
    }).then((state) => {
        if (state.players.length == 1){
            onlineplayers = state.players.length + " Player Online"
	    map = state.map
        } else {
            onlineplayers = state.players.length + " Players Online"
	    map = state.map
        }
    }).catch((error) => {
    onlineplayers = "SERVER OFFLINE"
	map = "N/A"
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

function sendmessage(){
    var guild = client.guilds.get('581921321446014987');
    if(guild && guild.channels.get('663172964858069022')){
        const exampleEmbed = new Discord.RichEmbed()
	    .setColor('#0099ff')
	    .setTitle('[NEW!] Imperial RP - Hiring COs - Defined Network')
	    //.setURL('steam://connect/96.30.193.219:27015')
	    //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	    .setDescription("Defined Networks is a premier Imperial RP server located on Garry's Mod. We strive to provide the best experience to our players and hope you enjoy our server as much as we do making it!")
	    .setThumbnail('https://justatestasdasd.000webhostapp.com/menu/servericon.png')
	    .addField('Server IP Address', '96.30.193.219:27015')
	    .addField('Current Server Status', onlineplayers)
	    .addField('Current Map', map)
	    //.setImage('https://i.imgur.com/wSTFkRM.png')
	    .setTimestamp()
	    .setFooter('Please DM a developer if this bot breaks', 'https://justatestasdasd.000webhostapp.com/menu/config/uploads/icons/icon.png');
        guild.channels.get('663172964858069022').send(exampleEmbed);
    }

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

setInterval(sendmessage, 30000);
sendrequest() // at init so it shows the player count for the first 100 seconds
setInterval(sendrequest, 100000);
setInterval(updatename, 10000);
setInterval(updateplayers, 4600);

client.login(process.env.BOT_NEW);

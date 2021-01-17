const Discord = require('discord.js');
const client = new Discord.Client();

const { token } = require('./config')
console.log('token: ', token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login('token');

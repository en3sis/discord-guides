const Discord = require('discord.js');
const client = new Discord.Client();

const { token } = require('./config')
const svgToPng = require('./examples/svgToPng')
const htmlToPng = require('./examples/htmlToPng')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
  const args = msg.content
    .split(' ');

  // SVG to PNG Handler
  if (msg.content.startsWith('svg')) {
    svgToPng(msg, args[1])
  }

  // HTML to JPG Handler
  if (msg.content.startsWith('html')) {
    htmlToPng(msg, args[1])
  }
});

client.login(token);

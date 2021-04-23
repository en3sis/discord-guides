const Discord = require('discord.js');
const client = new Discord.Client();

const { token } = require('./config')
const svgToPng = require('./examples/svgToPng')
const htmlToPng = require('./examples/htmlToPng')
const cache = require('./examples/cache')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
  const args = msg.content
    .split(' ');

  // Cache examples
  if (msg.content.startsWith('cache')) {
    cache(msg, args[1], args[2])
  }

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

const Eris = require('eris');
const dotenv = require('dotenv').config();

const bot = new Eris(process.env.BOT_TOKEN);

bot.on('ready', () => {
  console.log('Ready!');
});

const headsOrTailsResponses = {
  heads: ['Face.', "C'est face.", "C'est face cette fois-ci."],
  tails: ['Pile.', "C'est pile.", "C'est pile cette fois-ci."],
};

const headsOrTails = () => {
  const randomProperty = Math.random() < 0.5 ? 'heads' : 'tails';
  const randomResponse =
    headsOrTailsResponses[randomProperty][
      Math.floor(Math.random() * headsOrTailsResponses[randomProperty].length)
    ];

  return randomResponse;
};

bot.on('messageCreate', (msg) => {
  console.log(msg);
  console.log(msg.channel.id);
  switch (msg.content) {
    case '!pof':
      bot.createMessage(msg.channel.id, headsOrTails());
      break;
    case '!plouf':
      bot.createMessage(msg.channel.id, 'Cela va au delà de mes compétences.');
      break;
  }
});

bot.connect();

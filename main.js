import Eris from 'eris';
import dotenv from 'dotenv';
import { headsOrTails } from './commands/heads-or-tails.js';
import { currentPubMap } from './commands/apex.js';
import { autoSchedule } from './commands/auto.js';

const IDServer = '439897141025046532';

dotenv.config();

const bot = new Eris(process.env.BOT_TOKEN);

bot.on('ready', async () => {
    console.log('Ready!');
    await bot.createGuildCommand(IDServer, {
        name: 'pof',
        type: 1,
        description: 'headsOrTails',
      });
    await bot.createGuildCommand(IDServer, {
        name: 'plouf',
        type: 1,
        description: 'plouf',
      });
    await bot.createGuildCommand(IDServer, {
        name: 'auto',
        type: 1,
        description: 'auto horaire de travail',
      });
    await bot.createGuildCommand(IDServer, {
        name: 'rota',
        type: 1,
        description: 'map rotation',
      });
});

bot.on('messageCreate', async (msg) => {
    // console.log(msg);
    console.log(msg.channel.id);

    switch (msg.content) {
        case '!pof':
            bot.createMessage(msg.channel.id, headsOrTails());
            break;
        case '!plouf':
            bot.createMessage(
                msg.channel.id,
                'Cela va au delà de mes compétences.'
            );
            break;
        case '!rota':
            bot.createMessage(msg.channel.id, await currentPubMap());
            break;
        case '!auto':
            bot.createMessage(msg.channel.id, autoSchedule());
            break;
    }
});

bot.on('interactionCreate', async (Interaction) => {
    switch (Interaction.data.name) {
        case 'pof':
            Interaction.createMessage(msg.channel.id, headsOrTails());
            break;
        case 'plouf':
            Interaction.createMessage(
                msg.channel.id,
                'Cela va au delà de mes compétences.'
            );
            break;
        case 'rota':
            Interaction.createMessage(msg.channel.id, await currentPubMap());
            break;
        case 'auto':
            Interaction.createMessage(msg.channel.id, autoSchedule());
            break;
        }
  });

bot.connect();
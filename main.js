import Eris from 'eris';
import dotenv from 'dotenv';
import { headsOrTails } from './commands/heads-or-tails.js';
import { currentPubMap } from './commands/apex.js';
import { autoSchedule } from './commands/auto.js';

dotenv.config();

const bot = new Eris(process.env.BOT_TOKEN);

bot.on('ready', () => {
    console.log('Ready!');
});

bot.on('messageCreate', (msg) => {
    console.log(msg);
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
            bot.createMessage(msg.channel.id, currentPubMap());
            break;
        case '!auto':
            bot.createMessage(msg.channel.id, autoSchedule());
            break;
    }
});

bot.connect();

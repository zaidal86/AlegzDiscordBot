import Eris from 'eris';
import dotenv from 'dotenv';
import { headsOrTails } from './commands/heads-or-tails';
import { currentPubMap } from './commands/apex';
import { autoSchedule } from './commands/auto';

dotenv.config();

const bot: Eris.Client = new Eris.Client(process.env.BOT_TOKEN as string);

const serverId = process.env.DISCORD_ID as string;

bot.on('ready', async () => {
    console.log('Ready!');
    await bot.createGuildCommand(serverId, {
        name: 'pof',
        type: 1,
        description: 'Demande pile ou face à Siri',
    });
    await bot.createGuildCommand(serverId, {
        name: 'plouf',
        type: 1,
        description: 'Demande plouf à Siri',
    });
    await bot.createGuildCommand(serverId, {
        name: 'auto',
        type: 1,
        description: "Horaires d'auto",
    });
    await bot.createGuildCommand(serverId, {
        name: 'rota',
        type: 1,
        description: 'Map actuelle en pub sur Apex Legends',
    });
});

bot.on('messageCreate', async (msg: Eris.Message) => {
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

bot.on('interactionCreate', async (interaction: Eris.CommandInteraction) => {
    switch (interaction.data.name) {
        case 'pof':
            interaction.createMessage(headsOrTails());
            break;
        case 'plouf':
            interaction.createMessage('Cela va au delà de mes compétences.');
            break;
        case 'rota':
            interaction.createMessage(await currentPubMap());
            break;
        case 'auto':
            interaction.createMessage(autoSchedule());
            break;
    }
});

bot.connect();

import { CommandInteraction } from 'discord.js';

export const ping = {
    name: 'ping',
    description: 'Responde com Pong!',
    execute: async (interaction: CommandInteraction) => {
        await interaction.reply('Pong!');
    },
};

export default ping;
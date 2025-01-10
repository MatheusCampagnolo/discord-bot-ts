import { CommandInteraction } from 'discord.js';

export const hello = {
    name: 'hello',
    description: 'Responde com uma saudação!',
    execute: async (interaction: CommandInteraction) => {
        await interaction.reply('Olá! Como posso ajudar?');
    },
};

export default hello;
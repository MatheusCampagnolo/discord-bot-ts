import { CommandInteraction } from 'discord.js';

export const roll = {
    name: 'coinflip',
    description: 'Joga uma moeda e retorna o resultado',
    execute: async (interaction: CommandInteraction) => {
        const result = Math.random() < 0.5 ? 'Cara' : 'Coroa';
        await interaction.reply(`O resultado foi: ${result}`);
    },
};

export default roll;
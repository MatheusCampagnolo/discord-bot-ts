import { CommandInteraction } from 'discord.js';

export const echo = {
    name: 'echo',
    description: 'Repeats the message provided by the user',
    options: [
        {
            name: 'message',
            type: 3, // STRING
            description: 'The message to repeat',
            required: true,
        },
    ],
    execute: async (interaction: CommandInteraction) => {
        const message = interaction.options.get('message')?.value as string;
        await interaction.reply(message);
    },
};

export default echo;
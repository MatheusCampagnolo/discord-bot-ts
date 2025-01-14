import { CommandInteraction, Message } from 'discord.js';

export const poll = {
    name: 'poll',
    description: 'Cria uma enquete simples',
    options: [
        {
            name: 'pergunta',
            type: 3, // STRING
            description: 'A pergunta para a enquete',
            required: true,
        },
    ],
    execute: async (interaction: CommandInteraction) => {
        const question = interaction.options.get('pergunta')?.value as string;
        const formattedQuestion = `>>> ## 📊 **Enquete:**\n ### -> ${question}\n\nReaja abaixo para votar:\n*👍 - Sim | 👎 - Não*\n\n-# Por favor, vote com responsabilidade.`;
        
        await interaction.reply({ content: formattedQuestion });
        const pollMessage = await interaction.fetchReply() as Message;
        
        await pollMessage.react('👍');
        await pollMessage.react('👎');

        const filter = (reaction: any, user: any) => {
            return ['👍', '👎'].includes(reaction.emoji.name) && !user.bot;
        };

        const collector = pollMessage.createReactionCollector({ filter, dispose: true });

        collector.on('collect', (reaction, user) => {
            if (reaction.emoji.name !== null && !['👍', '👎'].includes(reaction.emoji.name)) {
                reaction.users.remove(user.id);
            }
        });

        collector.on('remove', (reaction, user) => {
            if (reaction.emoji.name !== null && !['👍', '👎'].includes(reaction.emoji.name)) {
                reaction.users.remove(user.id);
            }
        });
    },
};

export default poll;
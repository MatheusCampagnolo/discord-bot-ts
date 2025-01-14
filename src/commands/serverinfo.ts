import { CommandInteraction, Guild } from 'discord.js';

export const serverinfo = {
    name: 'serverinfo',
    description: 'Exibe informações sobre o servidor',
    execute: async (interaction: CommandInteraction) => {
        const { guild } = interaction;
        if (guild) {
            const owner = await guild.fetchOwner();
            const createdAt = guild.createdAt.toLocaleDateString('pt-BR');
            const roles = guild.roles.cache.size;
            const channels = guild.channels.cache.size;
            const emojis = guild.emojis.cache.size;

            const formattedServerInfo = `
                >>> ## 📝 Informações do Servidor
                - 🏷️ **Nome do servidor:** *${guild.name}*
                - 👑 **Proprietário:** *${owner.user.tag}*
                - 📅 **Data de criação:** *${createdAt}*
                - 👥 **Total de membros:** *${guild.memberCount}*
                - 🛡️ **Total de cargos:** *${roles}*
                - 📁 **Total de canais:** *${channels}*
                - 😀 **Total de emojis:** *${emojis}*
            `;

            await interaction.reply(formattedServerInfo);
        } else {
            await interaction.reply('Este comando só pode ser usado em um servidor.');
        }
    },
};

export default serverinfo;
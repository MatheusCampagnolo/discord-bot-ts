import { Client, GatewayIntentBits as Intents, REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN!;
const CLIENT_ID = process.env.CLIENT_ID!;
const GUILD_ID = process.env.GUILD_ID!;

const client = new Client({ intents: [Intents.Guilds, Intents.GuildMessages] });

client.once('ready', async () => {
    console.log(`Bot conectado como ${client.user?.tag}`);

    const rest = new REST({ version: '10' }).setToken(TOKEN);

    const commands = [
        {
            name: 'ping',
            description: 'Responde com Pong!',
        },
        {
            name: 'hello',
            description: 'Responde com uma saudação!',
        },
    ];

    try {
        console.log('Registrando comandos de barra...');
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        );
        console.log('Comandos de barra registrados com sucesso!');
    } catch (error) {
        console.error('Erro ao registrar comandos de barra:', error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'hello') {
        await interaction.reply('Olá! Como posso ajudar?');
    }
});

client.login(TOKEN);
import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN!;
const CLIENT_ID = process.env.CLIENT_ID!;
const GUILD_ID = process.env.GUILD_ID!;

const commands: any[] = [];

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.default);
}

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Limpando comandos antigos...');
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: [] },
        );
        console.log('Comandos antigos limpos com sucesso!');

        console.log('Registrando novos comandos de barra...');
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        );
        console.log('Novos comandos de barra registrados com sucesso!');
    } catch (error) {
        console.error('Erro ao registrar comandos de barra:', error);
    }
})();

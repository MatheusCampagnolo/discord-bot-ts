import { Client, GatewayIntentBits as Intents, REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import axios from 'axios';

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
        {
            name: 'weather',
            description: 'Fornece a previsão do tempo para uma cidade',
            options: [
                {
                    name: 'city',
                    type: 3, // STRING
                    description: 'A cidade para a qual você quer a previsão do tempo',
                    required: true,
                },
            ],
        },
    ];

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
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'hello') {
        await interaction.reply('Olá! Como posso ajudar?');
    } else if (commandName === 'weather') {
        const city = interaction.options.get('city')?.value as string;
        const weather = await getWeather(city);
        await interaction.reply(weather);
    }
});

async function getWeather(city: string): Promise<string> {
    try {
        const geoResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search`, {
            params: {
                name: city,
            }
        });

        const geoData = geoResponse.data as { results?: { latitude: number; longitude: number }[] };
        if (!geoData.results || geoData.results.length === 0) {
            return `Não foi possível encontrar a cidade ${city}.`;
        }

        const { latitude, longitude } = geoData.results[0];

        const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
            params: {
                latitude: latitude,
                longitude: longitude,
                daily: 'temperature_2m_min,temperature_2m_max,precipitation_sum',
                current_weather: true,
                timezone: 'auto'
            }
        });

        const weatherData = weatherResponse.data as {
            current_weather?: { temperature: number; weathercode: string };
            daily?: {
                temperature_2m_min: number[];
                temperature_2m_max: number[];
                precipitation_sum: number[];
            };
        };

        if (weatherData.current_weather && weatherData.daily) {
            const currentTemp = weatherData.current_weather.temperature;
            const minTemp = weatherData.daily.temperature_2m_min[0];
            const maxTemp = weatherData.daily.temperature_2m_max[0];
            const precipitation = weatherData.daily.precipitation_sum[0];

            return `A previsão do tempo para ${city} é:\n` +
                   `Temperatura atual: ${currentTemp}°C\n` +
                   `Temperatura mínima: ${minTemp}°C\n` +
                   `Temperatura máxima: ${maxTemp}°C\n` +
                   `Chances de chuva: ${precipitation}mm`;
        } else {
            return `Não foi possível obter a previsão do tempo para ${city}.`;
        }
    } catch (error) {
        console.error('Erro ao obter a previsão do tempo:', error);
        return 'Ocorreu um erro ao obter a previsão do tempo.';
    }
}

client.login(TOKEN);
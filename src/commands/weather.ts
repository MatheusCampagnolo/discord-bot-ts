import { CommandInteraction } from 'discord.js';
import { getWeather } from '../utils/getWeather';

export const weather = {
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
    execute: async (interaction: CommandInteraction) => {
        const city = interaction.options.get('city')?.value as string;
        const weatherInfo = await getWeather(city);
        await interaction.reply(weatherInfo);
    },
};

export default weather;
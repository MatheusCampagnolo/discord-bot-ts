import { CommandInteraction } from 'discord.js';
import { getExchangeRate } from '../utils/getExchangeRate';

const validCurrencies = [
    { name: 'USD', value: 'USD' },
    { name: 'EUR', value: 'EUR' },
    { name: 'GBP', value: 'GBP' },
    { name: 'JPY', value: 'JPY' },
    { name: 'AUD', value: 'AUD' },
    { name: 'CAD', value: 'CAD' },
    { name: 'CHF', value: 'CHF' },
    { name: 'CNY', value: 'CNY' },
    { name: 'SEK', value: 'SEK' },
    { name: 'NZD', value: 'NZD' },
    { name: 'BRL', value: 'BRL' }, // Adicionando BRL
];

export const convert = {
    name: 'convert',
    description: 'Converte valores de uma moeda para outra',
    options: [
        {
            name: 'from',
            type: 3, // STRING
            description: 'A moeda de origem (ex: USD)',
            required: true,
            choices: validCurrencies,
        },
        {
            name: 'amount',
            type: 10, // NUMBER
            description: 'A quantia a ser convertida',
            required: true,
        },
        {
            name: 'to',
            type: 3, // STRING
            description: 'A moeda de destino (ex: EUR)',
            required: true,
            choices: validCurrencies,
        },
    ],
    execute: async (interaction: CommandInteraction) => {
        const from = interaction.options.get('from')?.value as string;
        const amount = interaction.options.get('amount')?.value as number;
        const to = interaction.options.get('to')?.value as string;

        if (!validCurrencies.some(currency => currency.value === from)) {
            await interaction.reply(`Moeda de origem inválida: ${from}`);
            return;
        }

        if (!validCurrencies.some(currency => currency.value === to)) {
            await interaction.reply(`Moeda de destino inválida: ${to}`);
            return;
        }

        const result = await getExchangeRate(from, to, amount);
        await interaction.reply(result);
    },
};

export default convert;
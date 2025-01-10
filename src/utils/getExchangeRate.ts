import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface ExchangeRateApiResponse {
    conversion_rate: number;
}

const API_KEY = process.env.EXCHANGE_RATE_API_KEY;

export async function getExchangeRate(from: string, to: string, amount: number): Promise<string> {
    try {
        const response = await axios.get<ExchangeRateApiResponse>(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}`);

        const data = response.data;
        const rate = data.conversion_rate;

        if (rate) {
            const convertedAmount = (amount * rate).toFixed(2);
            return `${amount} ${from} é igual a ${convertedAmount} ${to} (Taxa de câmbio: ${rate})`;
        } else {
            return `Não foi possível obter a taxa de câmbio para ${from} para ${to}.`;
        }
    } catch (error) {
        console.error('Erro ao obter a taxa de câmbio:', error);
        return 'Ocorreu um erro ao obter a taxa de câmbio.';
    }
}
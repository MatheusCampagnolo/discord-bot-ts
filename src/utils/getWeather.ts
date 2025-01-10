import axios from 'axios';

export async function getWeather(city: string): Promise<string> {
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
const config = {
    timeIntervalUpdateSatellites: 30000,     // Интервал обновления данных спутников (в миллисекундах)
    timeBackendResponse: 500,               // Время ответа backend
    probabilitySatelliteStatusError: 0.1    // Вероятность 500 ошибки от сервера при GET /satellites/status
};

export default config;
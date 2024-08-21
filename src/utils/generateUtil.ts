// Компонент для графиков температуры и уровня заряда
export const generateRandomData = (from: number = 0, to: number = 100) => {
    const data = [];
    for (let i = 0; i < 24; i++) {
        data.push(Math.floor(Math.random() * (to - from)) + from);
    }
    return data;
};
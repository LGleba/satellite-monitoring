import L from 'leaflet';

// Настройка иконок для разных типов спутников
export const getIconBySatelliteType = (type: string) => {
    return new L.Icon({
        iconUrl: `/icons/${type}.svg`,
        iconSize: [64, 64],
    });
};

// Функция для выбора правильной иконки батареи
export const getBatteryIcon = (level: number) => {
    if (level > 75) return '/icons/battery.100percent.svg';
    if (level > 50) return '/icons/battery.75percent.svg';
    if (level > 25) return '/icons/battery.50percent.svg';
    if (level > 0) return '/icons/battery.25percent.svg';
    return '/icons/battery.0percent.svg';
};

export const getTemperatureIcon = (temperature: number | undefined) => {
    if (temperature === undefined || temperature == null) return '/icons/thermometer.medium.slash.svg';
    if (temperature > 25) return '/icons/thermometer.high.svg';
    if (temperature > -25) return '/icons/thermometer.medium.svg';
    return '/icons/thermometer.low.svg';
};

export const getSpeedIcon = (speed: number | undefined) => {
    if (speed === undefined || speed == null) return '/icons/gauge.with.dots.needle.0percent.svg';
    if (speed > 7.67) return '/icons/gauge.with.dots.needle.100percent.svg';
    if (speed > 7.5) return '/icons/gauge.with.dots.needle.67percent.svg';
    if (speed > 7.33) return '/icons/gauge.with.dots.needle.50percent.svg';
    if (speed > 7) return '/icons/gauge.with.dots.needle.33percent.svg';
    return '/icons/gauge.with.dots.needle.0percent.svg';
};
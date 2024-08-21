import satellitesData from '../data/satellites.json';
import config from "../config";
import {Satellite} from "../model/Satellite";

export const getSatellites = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(satellitesData)
        }, config.timeBackendResponse);
    });
};

export const getSatelliteById = async (id: string, from: any | null = null): Promise<Satellite> => {
    return new Promise((resolve, reject) => {
        const sats = from ?? satellitesData
        const satellite: Satellite = sats.find((sat: Satellite) => { // satellitesData хочу заменить на satellites
            return sat.id === id
        });
        setTimeout(() => {
            if (satellite) {
                resolve(satellite)
            } else {
                reject(new Error("Satellite not found"))
            }
        }, config.timeBackendResponse);
    });
};

export const getSatellitesStatus = async () => {
    // Имитация ошибки в 10% случаев
    const randomFailure = Math.random() < config.probabilitySatelliteStatusError;
    return new Promise((resolve, reject) => {
        if (randomFailure) {
            setTimeout(() => {
                reject(new Error("Internal Server Error"))
            }, config.timeBackendResponse);
        } else {
            const statusCounts = satellitesData.reduce(
                (acc, sat) => { // acc - накапливаемая переменная
                    acc[sat.status] = (acc[sat.status] || 0) + 1;
                    return acc;
                },
                {} as Record<string, number>
            );
            setTimeout(() => {
                resolve(statusCounts)
            }, config.timeBackendResponse);
        }
    });
};

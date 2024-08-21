import {createAsyncThunk} from "@reduxjs/toolkit";
import {Satellite} from "../model/Satellite";
import {getSatelliteById, getSatellites, getSatellitesStatus} from "../api/satelliteService";
import {StoreState} from "./StoreState";

export const fetchSatellites = createAsyncThunk<Satellite[], Satellite[]>('values/fetchAll', async (satellites : Satellite[]) => {
    // Проверяем, если данные уже в кэше, возвращаем их
    if (satellites.length > 0) {
        return satellites
    }

    const response = await getSatellites();
    return response as Satellite[];
});


interface FetchSatelliteByIdArgs {
    id: string;
    from: Satellite[] | null
}
export const fetchSatelliteById = createAsyncThunk<Satellite, FetchSatelliteByIdArgs>('values/fetchById', async ({id, from}) => {
    const response = await getSatelliteById(id, from);
    return response as Satellite;
});


export const fetchSatellitesStatus = createAsyncThunk<Record<string, number>>('values/fetchStatus', async () => {
    const response = await getSatellitesStatus();
    return response as Record<string, number>;
});

// Имитация обновления спутниковых данных каждые 30 секунд
export const fetchUpdateSatelliteData = createAsyncThunk<Satellite[], void>('values/updateData', async (_, { getState }) => {
    const state = getState() as { values: StoreState };
    const updatedSatellites = state.values.satellites.map((satellite) => {
        const newLatitude = (satellite.coordinates.latitude + (Math.random() - 0.5)) % 90;
        const newLongitude = (satellite.coordinates.longitude + (Math.random() - 0.5)) % 180;

        const newTemperature = satellite.temperature
            ? {
                mainSystem: (satellite.temperature.mainSystem + (Math.random() - 0.5) * 2) % 50,
                communication: (satellite.temperature.communication + (Math.random() - 0.5) * 2) % 50,
                powerUnit: (satellite.temperature.powerUnit + (Math.random() - 0.5) * 2) % 50,
            }
            : undefined;

        const newSpeed = satellite.speed ? (((satellite.speed + (Math.random() - 0.5) * 0.2) % 1) + 7) : undefined;
        return {
            ...satellite,
            coordinates: {
                latitude: newLatitude,
                longitude: newLongitude,
            },
            temperature: newTemperature,
            speed: newSpeed,
        };
    });
    return updatedSatellites;
});


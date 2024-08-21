import {Satellite} from "../model/Satellite";
import {sortKeyType, sortOrderByType} from "../model/types";


export interface StoreState {
    highlightedSatelliteId: string | null;
    satellites: Satellite[];
    statusCounts: Record<string, number> | null;
    selectedSatellite: Satellite | null;
    isLoadingSatellites: boolean;
    isLoadingStatus: boolean;
    isLoadingSatellite: boolean;
    error: string | null;
    filtr: {
        type: string | null;
        status: string | null;
    };
    srt: {
        key: sortKeyType;
        orderBy: sortOrderByType;
    };
    filteredSatellites: Satellite[];
    isSyncMapAndList: boolean;
}

export const initialState: StoreState = {
    highlightedSatelliteId: null,
    satellites: [],
    statusCounts: null, // Добавить
    selectedSatellite: null,
    isLoadingSatellites: false,
    isLoadingStatus: false,
    isLoadingSatellite: false,
    error: null,    // Добавить
    filtr: {
        type: null,
        status: null,
    },
    srt: {
        key: 'name',
        orderBy: 'asc',
    },
    filteredSatellites: [],
    isSyncMapAndList: true,
};
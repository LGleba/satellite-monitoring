import {StoreState} from "../store/StoreState";
import {Satellite} from "../model/Satellite";
import {sortKeyType, sortOrderByType} from "../model/types";

export const filterSatellites = (
    satellites: any[],
    type: string | null,
    status: string | null
) => {
    return satellites
        .filter((sat) => (type ? sat.type === type : true))
        .filter((sat) => (status ? sat.status === status : true));
};

export const sortSatellites = (
    satellites: any[],
    sortKey: sortKeyType,
    orderBy: sortOrderByType
) => {
    return satellites.sort((a, b) => {
        const comparison = sortKey === 'orbitHeight'
            ? a.orbitHeight - b.orbitHeight
            : a[sortKey].localeCompare(b[sortKey]);
        return orderBy === 'asc' ? comparison : -comparison;
    });
};

// Логика фильтрации и сортировки
export function filterAndSortSatellites(state: StoreState): Satellite[] {
    let filtered = filterSatellites(state.satellites, state.filtr.type, state.filtr.status)
    let sorted = sortSatellites(filtered, state.srt.key, state.srt.orderBy)
    return sorted
}
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchSatelliteById, fetchSatellites, fetchSatellitesStatus, fetchUpdateSatelliteData} from "./actions";
import {filterAndSortSatellites} from "../utils/filterAndSortUtil";
import {initialState} from "./StoreState";

// Слайс для управления состоянием спутников
export const storeSlice = createSlice({
    name: 'satellites',
    initialState,
    reducers: { // actions
        setHighlightedSatellite(state, action) {
            state.highlightedSatelliteId = action.payload;
        },
        setFilterType: (state, action: PayloadAction<string | null>) => {
            state.filtr.type = action.payload;
            state.filteredSatellites = filterAndSortSatellites(state); // Обновляем filteredSatellites
        },
        setFilterStatus: (state, action: PayloadAction<string | null>) => {
            state.filtr.status = action.payload;
            state.filteredSatellites = filterAndSortSatellites(state);
        },
        setSortKey: (state, action: PayloadAction<'name' | 'type' | 'status' | 'orbitHeight'>) => {
            state.srt.key = action.payload;
            state.filteredSatellites = filterAndSortSatellites(state);
        },
        setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.srt.orderBy = action.payload;
            state.filteredSatellites = filterAndSortSatellites(state);
        },
        setIsSyncMapAndList: (state, action: PayloadAction<boolean>) => {
            state.isSyncMapAndList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSatellites.pending, (state) => {
                state.isLoadingSatellites = true;
                state.error = null;
            })
            .addCase(fetchSatellites.fulfilled, (state, action) => {
                state.satellites = action.payload;
                state.filteredSatellites = filterAndSortSatellites(state); // Применяем фильтры и сортировку
                state.isLoadingSatellites = false;
                state.error = null
            })
            .addCase(fetchSatellites.rejected, (state, action) => {
                state.isLoadingSatellites = false;
                state.error = action.error.message || 'Failed to fetch satellites';
            })

            .addCase(fetchSatelliteById.pending, (state, action) => {
                state.isLoadingSatellite = true;
                state.error = null;
            })
            .addCase(fetchSatelliteById.fulfilled, (state, action) => {
                state.selectedSatellite = action.payload;
                state.isLoadingSatellite = false;
                state.error = null;
            })
            .addCase(fetchSatelliteById.rejected, (state, action) => {
                state.isLoadingSatellite = false;
                state.error = action.error.message || 'Failed to fetch satellite';
            })

            .addCase(fetchSatellitesStatus.pending, (state, action) => {
                state.isLoadingStatus = true;
                state.error = null;
            })
            .addCase(fetchSatellitesStatus.fulfilled, (state, action) => {
                state.statusCounts = action.payload;
                state.isLoadingStatus = false;
                state.error = null;
            })
            .addCase(fetchSatellitesStatus.rejected, (state, action) => {
                state.statusCounts = null
                state.isLoadingStatus = false;
                state.error = action.error.message || 'Failed to fetch status satellites';
            })

            .addCase(fetchUpdateSatelliteData.pending, (state, action) => {

            })
            .addCase(fetchUpdateSatelliteData.fulfilled, (state, action) => {
                state.satellites = action.payload;
                state.filteredSatellites = filterAndSortSatellites(state); // Применяем фильтры и сортировку
            })
            .addCase(fetchUpdateSatelliteData.rejected, (state, action) => {

            })
    },
});






import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import SatelliteRow from './SatelliteRow';
import { configureStore } from '@reduxjs/toolkit';
import { storeSlice } from '../store/storeSlice';
import { Satellite } from '../model/Satellite';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

// Mock iconsUtil functions
jest.mock('../utils/iconsUtil', () => ({
    getBatteryIcon: jest.fn(() => '/icons/battery-full.svg'),
    getSpeedIcon: jest.fn(() => '/icons/speed.svg'),
    getTemperatureIcon: jest.fn(() => '/icons/temperature.svg'),
}));

describe('SatelliteRow component', () => {
    const mockSatellite: Satellite = {
        id: 'sat-1',
        name: 'Satellite A',
        type: 'communication',
        status: 'active',
        coordinates: { longitude: 50.123456789, latitude: 20.987654321 },
        orbitHeight: 400,
        batteryLevel: 80,
        lastUpdate: '2024-08-20T10:00:00Z',
        speed: 7.8,
        temperature: {
            mainSystem: 25.5,
            communication: 28.2,
            powerUnit: 30.1,
        },
    };

    const mockStore = configureStore({
        reducer: {
            values: storeSlice.reducer,
        },
    });

    it('should render satellite data correctly', () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <SatelliteRow satellite={mockSatellite} hasButtons={true} />
                </MemoryRouter>
            </Provider>
        );

        // Проверяем отображение основных данных
        expect(screen.getByText('sat-1')).toBeInTheDocument();
        expect(screen.getByText('Satellite A')).toBeInTheDocument();
        expect(screen.getByText('(communication)')).toBeInTheDocument();
        expect(screen.getByText('80 %')).toBeInTheDocument();
        expect(screen.getByText('400 км')).toBeInTheDocument();
        expect(screen.getByText('7.80 км/с')).toBeInTheDocument();
        expect(screen.getByText('25.50 °C')).toBeInTheDocument();
        expect(screen.getByText('28.20 °C')).toBeInTheDocument();
        expect(screen.getByText('30.10 °C')).toBeInTheDocument();
    });

    it('should handle button clicks correctly', () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <SatelliteRow satellite={mockSatellite} hasButtons={true} />
                </MemoryRouter>
            </Provider>
        );

        // Проверяем клик по кнопке "Найти на карте"
        const findOnMapButton = screen.getByText('Найти на карте');
        fireEvent.click(findOnMapButton);

        expect(mockStore.getState().values.highlightedSatelliteId).toBe('sat-1');

        // Проверяем клик по кнопке "Открыть"
        const openDetailsButton = screen.getByText('Открыть');
        fireEvent.click(openDetailsButton);

        expect(mockNavigate).toHaveBeenCalledWith('/satellite/sat-1');
    });
});

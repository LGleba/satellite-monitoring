import { Satellite } from '../model/Satellite';
import {filterSatellites, sortSatellites} from "./filterAndSortUtil";

const mockSatellites: Satellite[] = [
    {
        id: '1',
        name: 'Satellite A',
        type: 'communication',
        status: 'active',
        coordinates: { longitude: 50, latitude: 20 },
        orbitHeight: 400,
        batteryLevel: 80,
        lastUpdate: '2024-08-20T10:00:00Z'
    },
    {
        id: '2',
        name: 'Satellite B',
        type: 'navigation',
        status: 'inactive',
        coordinates: { longitude: 60, latitude: 30 },
        orbitHeight: 500,
        batteryLevel: 60,
        lastUpdate: '2024-08-21T11:00:00Z'
    },
    {
        id: '3',
        name: 'Satellite C',
        type: 'scientific',
        status: 'maintenance',
        coordinates: { longitude: 70, latitude: 40 },
        orbitHeight: 600,
        batteryLevel: 50,
        lastUpdate: '2024-08-22T12:00:00Z'
    }
];

describe('filterSatellites', () => {
    it('should filter satellites by type', () => {
        const filtered = filterSatellites(mockSatellites, 'communication', null);
        expect(filtered).toHaveLength(1);
        expect(filtered[0].name).toBe('Satellite A');
    });

    it('should filter satellites by status', () => {
        const filtered = filterSatellites(mockSatellites, null, 'inactive');
        expect(filtered).toHaveLength(1);
        expect(filtered[0].name).toBe('Satellite B');
    });

    it('should filter satellites by type and status', () => {
        const filtered = filterSatellites(mockSatellites, 'scientific', 'maintenance');
        expect(filtered).toHaveLength(1);
        expect(filtered[0].name).toBe('Satellite C');
    });

    it('should return all satellites if no filters are applied', () => {
        const filtered = filterSatellites(mockSatellites, null, null);
        expect(filtered).toHaveLength(3);
    });
});

describe('sortSatellites', () => {
    it('should sort satellites by name in ascending order', () => {
        const sorted = sortSatellites([...mockSatellites], 'name', 'asc');
        expect(sorted[0].name).toBe('Satellite A');
        expect(sorted[1].name).toBe('Satellite B');
        expect(sorted[2].name).toBe('Satellite C');
    });

    it('should sort satellites by name in descending order', () => {
        const sorted = sortSatellites([...mockSatellites], 'name', 'desc');
        expect(sorted[0].name).toBe('Satellite C');
        expect(sorted[1].name).toBe('Satellite B');
        expect(sorted[2].name).toBe('Satellite A');
    });

    it('should sort satellites by orbit height in ascending order', () => {
        const sorted = sortSatellites([...mockSatellites], 'orbitHeight', 'asc');
        expect(sorted[0].orbitHeight).toBe(400);
        expect(sorted[1].orbitHeight).toBe(500);
        expect(sorted[2].orbitHeight).toBe(600);
    });

    it('should sort satellites by orbit height in descending order', () => {
        const sorted = sortSatellites([...mockSatellites], 'orbitHeight', 'desc');
        expect(sorted[0].orbitHeight).toBe(600);
        expect(sorted[1].orbitHeight).toBe(500);
        expect(sorted[2].orbitHeight).toBe(400);
    });
});

export interface Satellite {
    id: string;
    name: string;
    type: string;
    status: string;
    coordinates: {
        longitude: number;
        latitude: number;
    };
    orbitHeight: number;
    speed?: number;
    temperature?: {
        mainSystem: number;
        communication: number;
        powerUnit: number;
    };
    batteryLevel: number;
    lastUpdate: string;
}
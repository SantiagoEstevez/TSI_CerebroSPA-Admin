import { Dispositivo } from './dispositivo';

export class Evento {
    Name: string;
    Latitude: number;
    Longitude: number;
    DataSources: Dispositivo[];
    Actions: any[];
}
import { Dispositivo } from './dispositivo';
import { DataSource } from './DataSource';

export class Evento {
    Nombre: string;
    Latitude: number;
    Longitude: number;
    SendoresAsociados1: Dispositivo[];
    SendoresAsociados: DataSource[] = [];
    Actions: any[];

    //Para la ciudad
    ciudad: string;
    cLatitude: number;
    cLongitude: number;
}
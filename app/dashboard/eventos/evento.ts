import { Dispositivo } from './dispositivo';
import { DataSource } from './DataSource';

export class Evento {
    Nombre: string;
    Latitude: number;
    Longitude: number;
    SendoresAsociados: Dispositivo[] = [];
    Actions: any[];
    idZona: number;

    //Para la ciudad
    ciudad: string;
    cLatitude: number;
    cLongitude: number;
}
import { Dispositivo } from './dispositivo';

export class Evento {
    Nombre: string;
    Latitude: number;
    Longitude: number;
    SendoresAsociados: Dispositivo[];
    Actions: any[];

    //Para la ciudad
    ciudad: string;
    cLatitude: number;
    cLongitude: number;
}
import { Dispositivo } from './dispositivo';

export class Evento {
    nombre: string;
    zona: string;
    dispositivos: Dispositivo[];
    acciones: any[];
}
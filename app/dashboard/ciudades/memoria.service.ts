import { InMemoryDbService } from 'angular-in-memory-web-api';

export class MemoriaService implements InMemoryDbService {
    createDb() {
        let ciudad = [{ Nombre: "Monte", Latitud: 1, Longitud: 1}];
        let tiposensores = [];
        let tiposbaseensores = [{ nombre: 'Agua' }, { nombre: 'Fuego' }, { nombre: 'Tierra' }, { nombre: 'Aire' }, { nombre: 'Avatar maestro de los 4 elementos' }];
        let sensores = [];
        let zonas = [];
        let evento = [];

        return { ciudad, tiposensores, tiposbaseensores, sensores, zonas, evento };
    }
}
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class MemoriaService implements InMemoryDbService {
    createDb() {
        let ciudades = [{nombre: "Monte", lat: "1", lon: "1"}];
        let tiposensores = [];
        let tiposbaseensores = [{ nombre: 'Agua' }, { nombre: 'Fuego' }, { nombre: 'Tierra' }, { nombre: 'Aire' }, { nombre: 'Avatar maestro de los 4 elementos' }];
        let sensores = [];
        let zonas = [];

        return { ciudades, tiposensores, tiposbaseensores, sensores, zonas };
    }
}
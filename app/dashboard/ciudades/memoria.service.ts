import { InMemoryDbService } from 'angular-in-memory-web-api';

export class MemoriaService implements InMemoryDbService {
    createDb() {
        let ciudades = [];
        let tiposensores = [];
        let tiposbaseensores = [{ nombre: 'Agua' }, { nombre: 'Fuego' }, { nombre: 'Tierra' }, { nombre: 'Aire' }, { nombre: 'Avatar maestro de los 4 elementos' }];

        return { ciudades, tiposensores, tiposbaseensores };
    }
}
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class MemoriaService implements InMemoryDbService {
    createDb() {
        let ciudades = [
            { nombre: "Montevideo", lat: '40', lon: '40' },
            { nombre: "Ciudad de la costa", lat: '55', lon: '40' }
        ];
        return { ciudades };
    }
}
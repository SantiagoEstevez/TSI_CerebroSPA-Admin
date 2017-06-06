"use strict";
var MemoriaService = (function () {
    function MemoriaService() {
    }
    MemoriaService.prototype.createDb = function () {
        var ciudades = [{ nombre: "Monte", lat: "1", lon: "1" }];
        var tiposensores = [];
        var tiposbaseensores = [{ nombre: 'Agua' }, { nombre: 'Fuego' }, { nombre: 'Tierra' }, { nombre: 'Aire' }, { nombre: 'Avatar maestro de los 4 elementos' }];
        var sensores = [];
        var zonas = [];
        return { ciudades: ciudades, tiposensores: tiposensores, tiposbaseensores: tiposbaseensores, sensores: sensores, zonas: zonas };
    };
    return MemoriaService;
}());
exports.MemoriaService = MemoriaService;
//# sourceMappingURL=memoria.service.js.map
"use strict";
var MemoriaService = (function () {
    function MemoriaService() {
    }
    MemoriaService.prototype.createDb = function () {
        var ciudad = [{ Nombre: "Monte", Latitud: 1, Longitud: 1 }];
        var tiposensores = [];
        var tiposbaseensores = [{ nombre: 'Agua' }, { nombre: 'Fuego' }, { nombre: 'Tierra' }, { nombre: 'Aire' }, { nombre: 'Avatar maestro de los 4 elementos' }];
        var sensores = [];
        var zonas = [];
        var evento = [];
        return { ciudad: ciudad, tiposensores: tiposensores, tiposbaseensores: tiposbaseensores, sensores: sensores, zonas: zonas, evento: evento };
    };
    return MemoriaService;
}());
exports.MemoriaService = MemoriaService;
//# sourceMappingURL=memoria.service.js.map
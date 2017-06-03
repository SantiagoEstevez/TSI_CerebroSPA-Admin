"use strict";
var MemoriaService = (function () {
    function MemoriaService() {
    }
    MemoriaService.prototype.createDb = function () {
        var ciudades = [];
        var tiposensores = [];
        var tiposbaseensores = [{ nombre: 'Agua' }, { nombre: 'Fuego' }, { nombre: 'Tierra' }, { nombre: 'Aire' }, { nombre: 'Avatar maestro de los 4 elementos' }];
        return { ciudades: ciudades, tiposensores: tiposensores, tiposbaseensores: tiposbaseensores };
    };
    return MemoriaService;
}());
exports.MemoriaService = MemoriaService;
//# sourceMappingURL=memoria.service.js.map
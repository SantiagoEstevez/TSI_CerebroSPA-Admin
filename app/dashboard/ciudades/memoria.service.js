"use strict";
var MemoriaService = (function () {
    function MemoriaService() {
    }
    MemoriaService.prototype.createDb = function () {
        var ciudades = [
            { nombre: "Montevideo", lat: '40', lon: '40' },
            { nombre: "Ciudad de la costa", lat: '55', lon: '40' }
        ];
        return { ciudades: ciudades };
    };
    return MemoriaService;
}());
exports.MemoriaService = MemoriaService;
//# sourceMappingURL=memoria.service.js.map
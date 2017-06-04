"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ciudades_service_1 = require('../ciudades/ciudades.service');
var tipo_sensor_service_1 = require('./tipo-sensor.service');
var tipo_sensor_1 = require('./tipo-sensor');
var TipoSensoresComponent = (function () {
    function TipoSensoresComponent(ciudadesService, tipoSensoresService, nuevoTipoSensor) {
        this.ciudadesService = ciudadesService;
        this.tipoSensoresService = tipoSensoresService;
        this.nuevoTipoSensor = nuevoTipoSensor;
        this.nombreCampoTS = 'Tipo de sensor';
        this.nombreCampoCiudad = 'Ciudad del sensor';
        this.CampoTS = '';
        this.CampoCiudad = '';
    }
    TipoSensoresComponent.prototype.ngOnInit = function () {
        this.inicializar();
    };
    //---> Funciones internas <---
    TipoSensoresComponent.prototype.inicializar = function () {
        this.CampoTS = this.nombreCampoTS;
        this.CampoCiudad = this.nombreCampoCiudad;
        this.nuevoTipoSensor.nombre = '';
        this.nuevoTipoSensor.frecuencia = '';
        this.nuevoTipoSensor.tipo = '';
        this.nuevoTipoSensor.ciudad = '';
        this.getCiudades();
        this.getTipoSensores();
        this.getTipoBaseSensor();
    };
    //---> Funciones de eventos <---
    TipoSensoresComponent.prototype.changeCiudad = function (value) {
        this.CampoCiudad = value.nombre;
        this.nuevoTipoSensor.ciudad = value.nombre;
    };
    TipoSensoresComponent.prototype.changeTipoBase = function (value) {
        this.CampoTS = value.nombre;
        this.nuevoTipoSensor.tipo = value.nombre;
    };
    TipoSensoresComponent.prototype.agregarTipoSensor = function () {
        var ciudad = this.nuevoTipoSensor.ciudad;
        var tipo = this.nuevoTipoSensor.tipo;
        var nombre = this.nuevoTipoSensor.nombre;
        var frecuencia = this.nuevoTipoSensor.frecuencia;
        if (ciudad != '' && tipo != '' && nombre != '' && frecuencia != '') {
            this.setTipoSensor(this.nuevoTipoSensor);
            this.inicializar();
        }
    };
    //---> Funciones de servicios <---
    TipoSensoresComponent.prototype.getCiudades = function () {
        var _this = this;
        this.ciudadesService
            .getCiudades()
            .then(function (ciudades) { return _this.ciudades = ciudades; });
    };
    TipoSensoresComponent.prototype.getTipoSensores = function () {
        var _this = this;
        this.tipoSensoresService
            .getTipoSensores()
            .then(function (tipoSensores) { return _this.tipoSensores = tipoSensores; });
    };
    TipoSensoresComponent.prototype.setTipoSensor = function (nuevo) {
        nuevo.nombre = nuevo.nombre.trim();
        //if (!nombre) { return; }
        this.tipoSensoresService.setTipoSensor(nuevo)
            .then(function (t) {
        });
    };
    TipoSensoresComponent.prototype.getTipoBaseSensor = function () {
        var _this = this;
        this.tipoSensoresService
            .getTipoBaseSensor()
            .then(function (tipoBaseSensores) { return _this.tipoBaseSensores = tipoBaseSensores; });
    };
    TipoSensoresComponent = __decorate([
        core_1.Component({
            selector: 'tipo-sensores-cmp',
            moduleId: module.id,
            templateUrl: 'tipo-sensores.component.html'
        }), 
        __metadata('design:paramtypes', [ciudades_service_1.CiudadesService, tipo_sensor_service_1.TipoSensoresService, tipo_sensor_1.TipoSensor])
    ], TipoSensoresComponent);
    return TipoSensoresComponent;
}());
exports.TipoSensoresComponent = TipoSensoresComponent;
//# sourceMappingURL=tipo-sensores.component.js.map
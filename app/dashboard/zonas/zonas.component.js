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
var tipo_sensor_service_1 = require('../tipo-sensores/tipo-sensor.service');
var sensor_1 = require('./sensor');
var sensores_service_1 = require('./sensores.service');
var SensoresComponent = (function () {
    function SensoresComponent(ciudadesService, tipoSensoresService, SensoresService, nuevoSensor) {
        this.ciudadesService = ciudadesService;
        this.tipoSensoresService = tipoSensoresService;
        this.SensoresService = SensoresService;
        this.nuevoSensor = nuevoSensor;
        this.nombreCampoTS = 'Tipo sensor';
        this.nombreCampoCiudad = 'Ciudad del sensor';
        this.CampoTS = '';
        this.CampoCiudad = '';
    }
    ;
    SensoresComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Cargo mapa
        var myLatlng = new google.maps.LatLng(-34.9114282, -56.1725558);
        var mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: true,
            styles: []
        };
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        //Cargo unico marcador
        this.marker = new google.maps.Marker({
            map: this.map
        });
        //Agregar evento
        this.map.addListener('click', function (e) {
            _this.nuevoSensor.lat = e.latLng.lat();
            _this.nuevoSensor.lon = e.latLng.lng();
            _this.marker.setPosition(e.latLng);
        });
        this.inicializo();
    };
    //---> Funciones internas <---
    SensoresComponent.prototype.inicializo = function () {
        this.CampoTS = this.nombreCampoTS;
        this.CampoCiudad = this.nombreCampoCiudad;
        this.nuevoSensor.lat = '';
        this.nuevoSensor.lon = '';
        this.nuevoSensor.tipo = '';
        this.nuevoSensor.ciudad = '';
        this.getCiudades();
        this.getTipoSensores();
        this.getSensores();
    };
    //---> Funciones de eventos <---
    SensoresComponent.prototype.changeTipoSensor = function (value) {
        this.CampoTS = value.nombre;
        this.nuevoSensor.tipo = value.nombre;
    };
    SensoresComponent.prototype.changeCiudad = function (value) {
        this.CampoCiudad = value.nombre;
        this.nuevoSensor.ciudad = value.nombre;
    };
    SensoresComponent.prototype.agregarSensor = function () {
        var ciudad = this.nuevoSensor.ciudad;
        var tipo = this.nuevoSensor.tipo;
        var lat = this.nuevoSensor.lat;
        var lon = this.nuevoSensor.lon;
        if (ciudad != '' && tipo != '' && lat != '' && lon != '') {
            this.setSensor(this.nuevoSensor);
            this.inicializo();
        }
    };
    //---> Funciones de servicios <---
    SensoresComponent.prototype.getCiudades = function () {
        var _this = this;
        this.ciudadesService
            .getCiudades()
            .then(function (ciudades) { return _this.ciudades = ciudades; });
    };
    SensoresComponent.prototype.getTipoSensores = function () {
        var _this = this;
        this.tipoSensoresService
            .getTipoSensores()
            .then(function (tipoSensores) { return _this.tipoSensores = tipoSensores; });
    };
    SensoresComponent.prototype.getSensores = function () {
        var _this = this;
        this.SensoresService
            .getSensores()
            .then(function (sensores) { return _this.sensores = sensores; });
    };
    SensoresComponent.prototype.setSensor = function (nuevo) {
        this.SensoresService.setSensor(nuevo);
    };
    SensoresComponent = __decorate([
        core_1.Component({
            selector: 'sensores-cmp',
            moduleId: module.id,
            templateUrl: 'sensores.component.html'
        }), 
        __metadata('design:paramtypes', [ciudades_service_1.CiudadesService, tipo_sensor_service_1.TipoSensoresService, (typeof (_a = typeof sensores_service_1.SensoresService !== 'undefined' && sensores_service_1.SensoresService) === 'function' && _a) || Object, (typeof (_b = typeof sensor_1.Sensor !== 'undefined' && sensor_1.Sensor) === 'function' && _b) || Object])
    ], SensoresComponent);
    return SensoresComponent;
    var _a, _b;
}());
exports.SensoresComponent = SensoresComponent;
//# sourceMappingURL=zonas.component.js.map
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
//Clases
var evento_1 = require('./evento');
var dispositivo_1 = require('./dispositivo');
//Servicios.
var eventos_service_1 = require('./eventos.service');
var tipo_sensor_service_1 = require('../tipo-sensores/tipo-sensor.service');
var ciudades_service_1 = require('../ciudades/ciudades.service');
var EventosComponent = (function () {
    function EventosComponent(eventosService, tipoSensoresService, CiudadesService) {
        this.eventosService = eventosService;
        this.tipoSensoresService = tipoSensoresService;
        this.CiudadesService = CiudadesService;
        //Nombres
        this.nombreCampoCiudad = 'Ciudad del sensor';
        this.nombreCampoTS = 'Tipo sensor';
        this.CampoCiudad = this.nombreCampoCiudad;
        this.CampoTS = '';
    }
    ;
    EventosComponent.prototype.ngOnInit = function () {
        this.inicializo();
    };
    //---> Funciones internas <---
    EventosComponent.prototype.inicializo = function () {
        this.CampoCiudad = this.nombreCampoCiudad;
        this.oEvento = new evento_1.Evento();
        this.dispositivos = [];
        this.inicializoDispositivo();
        this.getCiudades();
        this.getTipoSensores();
    };
    EventosComponent.prototype.inicializoDispositivo = function () {
        this.CampoTS = this.nombreCampoTS;
        this.oDispositivo = new dispositivo_1.Dispositivo();
    };
    //---> Funciones de eventos <---
    EventosComponent.prototype.agregarEvento = function () {
        if (this.dispositivos.length > 0) {
            if (this.oEvento.Name != "") {
                this.oEvento.DataSources = this.dispositivos;
                this.setEvento(this.oEvento);
                this.inicializo();
            }
            else {
                alert("Debe asignarle un nombre al evento.");
            }
        }
        else {
            alert("El evento debe tener por lo menos un tipo de sensor asociado.");
        }
    };
    EventosComponent.prototype.editarEvento = function () {
        alert("editando evento");
    };
    EventosComponent.prototype.eliminarEvento = function () {
        alert("eliminando evento");
    };
    EventosComponent.prototype.agregarDispositivo = function () {
        if (this.oDispositivo.Umbral != "" && this.oDispositivo.Tipo != "") {
            this.dispositivos.push(this.oDispositivo);
            this.inicializoDispositivo();
        }
        else {
            alert("Debe seleccionar el tipo y el humbral.");
        }
    };
    EventosComponent.prototype.eliminarDispositivo = function () {
        alert("eliminando de la lista >D");
    };
    EventosComponent.prototype.changeCiudad = function (ciudad) {
        this.CampoCiudad = ciudad.Nombre;
        //this.nuevoSensor.ciudad = ciudad.Nombre;
        //this.nuevoSensor.cLatitude = ciudad.Latitud;
        //this.nuevoSensor.cLongitude = ciudad.Longitud;
    };
    EventosComponent.prototype.changeTipoSensor = function (tipoSensor) {
        this.CampoTS = tipoSensor.nombre;
        this.oDispositivo.Tipo = tipoSensor.nombre;
    };
    //---> Funciones de servicios <---
    EventosComponent.prototype.getCiudades = function () {
        var _this = this;
        this.CiudadesService.getCiudades().then(function (ciudades) {
            _this.ciudades = ciudades;
            //this.getEventos();
        });
    };
    EventosComponent.prototype.getEventos = function () {
        var _this = this;
        for (var i = 0; i < this.ciudades.length; i++) {
            var nombre = this.ciudades[i].Nombre;
            this.eventosService.getEventos(this.ciudades[i].Latitud, this.ciudades[i].Longitud).then(function (eventos) {
                for (var e = 0; e < eventos.length; e++) {
                    _this.eventos.push(eventos[e]);
                }
                _this.eventos = eventos;
            });
        }
    };
    EventosComponent.prototype.getTipoSensores = function () {
        var _this = this;
        this.tipoSensoresService.getTipoBaseSensor().then(function (tipoSensores) { return _this.tipoSensores = tipoSensores; });
    };
    EventosComponent.prototype.setEvento = function (nuevo) {
        this.eventosService
            .setEvento(nuevo);
    };
    EventosComponent = __decorate([
        core_1.Component({
            selector: 'eventos-cmp',
            moduleId: module.id,
            templateUrl: 'eventos.component.html'
        }), 
        __metadata('design:paramtypes', [eventos_service_1.EventosService, tipo_sensor_service_1.TipoSensoresService, ciudades_service_1.CiudadesService])
    ], EventosComponent);
    return EventosComponent;
}());
exports.EventosComponent = EventosComponent;
//# sourceMappingURL=eventos.component.js.map
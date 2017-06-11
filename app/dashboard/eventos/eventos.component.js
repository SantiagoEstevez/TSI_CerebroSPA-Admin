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
var tipo_sensor_service_1 = require('../tipo-sensores/tipo-sensor.service');
var evento_1 = require('./evento');
var dispositivo_1 = require('./dispositivo');
var eventos_service_1 = require('./eventos.service');
var EventosComponent = (function () {
    function EventosComponent(eventosService, tipoSensoresService) {
        this.eventosService = eventosService;
        this.tipoSensoresService = tipoSensoresService;
        //Nombres
        this.nombreCampoTS = 'Tipo sensor';
        this.CampoTS = '';
    }
    ;
    EventosComponent.prototype.ngOnInit = function () {
        this.inicializo();
    };
    //---> Funciones internas <---
    EventosComponent.prototype.inicializo = function () {
        this.oEvento = new evento_1.Evento();
        this.dispositivos = [];
        this.inicializoDispositivo();
        this.getTipoSensores();
        this.getEventos();
    };
    EventosComponent.prototype.inicializoDispositivo = function () {
        this.CampoTS = this.nombreCampoTS;
        this.oDispositivo = new dispositivo_1.Dispositivo();
    };
    //---> Funciones de eventos <---
    EventosComponent.prototype.agregarEvento = function () {
        if (this.dispositivos.length > 0) {
            if (this.oEvento.nombre != "") {
                this.oEvento.dispositivos = this.dispositivos;
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
    EventosComponent.prototype.agregarDispositivo = function () {
        if (this.oDispositivo.regla != "" && this.oDispositivo.tipo != "") {
            this.dispositivos.push(this.oDispositivo);
            this.inicializoDispositivo();
        }
        else {
            alert("Debe seleccionar el tipo y la regla.");
        }
    };
    EventosComponent.prototype.eliminarDispositivo = function () {
        alert("eliminando de la lista >D");
    };
    EventosComponent.prototype.changeTipoSensor = function (tipoSensor) {
        this.CampoTS = tipoSensor.nombre;
        this.oDispositivo.tipo = tipoSensor.nombre;
    };
    EventosComponent.prototype.editarEvento = function () {
        alert("editando evento");
    };
    EventosComponent.prototype.eliminarEvento = function () {
        alert("eliminando evento");
    };
    //---> Funciones de servicios <---
    EventosComponent.prototype.getTipoSensores = function () {
        var _this = this;
        this.tipoSensoresService
            .getTipoSensores()
            .then(function (tipoSensores) { return _this.tipoSensores = tipoSensores; });
    };
    EventosComponent.prototype.getEventos = function () {
        var _this = this;
        this.eventosService
            .getEventos()
            .then(function (eventos) { return _this.eventos = eventos; });
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
        __metadata('design:paramtypes', [eventos_service_1.EventosService, tipo_sensor_service_1.TipoSensoresService])
    ], EventosComponent);
    return EventosComponent;
}());
exports.EventosComponent = EventosComponent;
//# sourceMappingURL=eventos.component.js.map
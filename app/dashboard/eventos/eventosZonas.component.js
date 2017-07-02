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
var zonas_service_1 = require('../zonas/zonas.service');
var EventosZonasComponent = (function () {
    function EventosZonasComponent(eventosService, tipoSensoresService, CiudadesService, ZonasService) {
        this.eventosService = eventosService;
        this.tipoSensoresService = tipoSensoresService;
        this.CiudadesService = CiudadesService;
        this.ZonasService = ZonasService;
        //Nombres
        this.nombreCampoCiudad = 'Ciudad del evento';
        this.nombreCampoTS = 'Tipo sensor';
        this.nombreCampoRegla = "Regla";
        this.CampoCiudad = this.nombreCampoCiudad;
        this.CampoTS = '';
        this.CampoRegla = '';
        this.reglas = [">=", "<="];
    }
    ;
    EventosZonasComponent.prototype.ngOnInit = function () {
        //Cargo mapa
        var myLatlng = new google.maps.LatLng(-34.9114282, -56.1725558);
        var mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: false,
            styles: []
        };
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        this.inicializo();
    };
    //---> Funciones internas <---
    EventosZonasComponent.prototype.inicializo = function () {
        this.CampoCiudad = this.nombreCampoCiudad;
        this.oEvento = new evento_1.Evento();
        this.eventos = [];
        this.dispositivos = [];
        this.zonas = [];
        this.zonasMapa = [];
        this.inicializoDispositivo();
        this.borrarZonasMapa();
        this.getCiudades();
        this.getTipoSensores();
    };
    EventosZonasComponent.prototype.inicializoDispositivo = function () {
        this.CampoTS = this.nombreCampoTS;
        this.CampoRegla = this.nombreCampoRegla;
        this.oDispositivo = new dispositivo_1.Dispositivo();
    };
    EventosZonasComponent.prototype.borrarZonasMapa = function () {
        for (var i = 0; i < this.zonasMapa.length; i++) {
            this.zonasMapa[i].setMap(null);
        }
        this.zonasMapa = [];
    };
    //---> Funciones de eventos <---
    EventosZonasComponent.prototype.agregarEvento = function () {
        if (this.dispositivos.length > 0) {
            if (this.oEvento.Nombre != "") {
                if (!isNaN(this.oEvento.Latitude) && !isNaN(this.oEvento.Longitude)) {
                    this.oEvento.SendoresAsociados = this.dispositivos;
                    //this.oEvento.SendoresAsociados.push({ ID: 1, Tipo: "Agua", Latitude: 1, Longitude: 1, Umbral: "> 900" });
                    this.setEvento(this.oEvento);
                }
                else {
                    alert("Debe seleccionar una zona.");
                }
            }
            else {
                alert("Debe asignarle un nombre al evento.");
            }
        }
        else {
            alert("El evento debe tener alguna regla asociada.");
        }
    };
    EventosZonasComponent.prototype.editarEvento = function () {
        alert("editando evento");
    };
    EventosZonasComponent.prototype.eliminarEvento = function () {
        alert("eliminando evento");
    };
    EventosZonasComponent.prototype.agregarDispositivo = function () {
        if (this.oDispositivo.Regla == ">=" || this.oDispositivo.Regla == "<=") {
            if (!isNaN(this.oDispositivo.Medida)) {
                if (this.oDispositivo.Tipo != undefined && this.oDispositivo.Tipo != this.nombreCampoTS) {
                    this.oDispositivo.Umbral = this.oDispositivo.Regla + " " + this.oDispositivo.Medida;
                    this.oDispositivo.cLatitude = this.oEvento.cLatitude;
                    this.oDispositivo.cLongitude = this.oEvento.cLongitude;
                    this.dispositivos.push(this.oDispositivo);
                    this.inicializoDispositivo();
                }
                else {
                    alert("Debe seleccionar un tipo de sensor.");
                }
            }
            else {
                alert("La medida debe ser numerica.");
            }
        }
        else {
            alert("La regla debe ser >= o <=");
        }
    };
    EventosZonasComponent.prototype.eliminarDispositivo = function (dispositivo) {
        var index = this.dispositivos.indexOf(dispositivo);
        if (index !== -1) {
            this.dispositivos.splice(index, 1);
        }
    };
    EventosZonasComponent.prototype.changeCiudad = function (ciudad) {
        this.CampoCiudad = ciudad.Nombre;
        this.oEvento.ciudad = ciudad.Nombre;
        this.oEvento.cLatitude = ciudad.Latitud;
        this.oEvento.cLongitude = ciudad.Longitud;
        this.map.setCenter(new google.maps.LatLng(ciudad.Latitud, ciudad.Longitud));
        this.getZonas(ciudad);
    };
    EventosZonasComponent.prototype.changeTipoSensor = function (tipoSensor) {
        this.CampoTS = tipoSensor.nombre;
        this.oDispositivo.Tipo = tipoSensor.nombre;
    };
    EventosZonasComponent.prototype.changeRegla = function (regla) {
        this.CampoRegla = regla;
        this.oDispositivo.Regla = regla;
    };
    //---> Funciones de servicios <---
    EventosZonasComponent.prototype.getCiudades = function () {
        var _this = this;
        this.CiudadesService.getCiudades(localStorage.getItem('username')).then(function (ciudades) {
            _this.ciudades = ciudades;
            _this.getEventos();
        });
    };
    EventosZonasComponent.prototype.getEventos = function () {
        var _this = this;
        var _loop_1 = function(i) {
            var nombre = this_1.ciudades[i].Nombre;
            //Por nombre ciudad
            //this.eventosService.getEventosZona(this.ciudades[i].Latitud, this.ciudades[i].Longitud).then(eventos => {
            //    if (eventos) {
            //        for (var e = 0; e < eventos.length; e++) {
            //            if (!eventos[e].SendoresAsociados) {
            //                eventos[e].SendoresAsociados = [];
            //            }
            //            this.eventos.push(eventos[e]);
            //        }
            //    }
            //});
            //Por nombre ciudad
            this_1.eventosService.getEventosZonaByCityName(nombre).then(function (eventos) {
                if (eventos) {
                    for (var e = 0; e < eventos.length; e++) {
                        if (!eventos[e].SendoresAsociados) {
                            eventos[e].ciudad = nombre;
                            eventos[e].SendoresAsociados = [];
                        }
                        _this.eventos.push(eventos[e]);
                    }
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.ciudades.length; i++) {
            _loop_1(i);
        }
    };
    EventosZonasComponent.prototype.getTipoSensores = function () {
        var _this = this;
        this.tipoSensoresService.getTipoBaseSensor().then(function (tipoSensores) { return _this.tipoSensores = tipoSensores; });
    };
    EventosZonasComponent.prototype.setEvento = function (nuevo) {
        var _this = this;
        this.eventosService.setEventoZona(nuevo).then(function (res) {
            var idEvento = Number(res);
            for (var v = 0; v < _this.dispositivos.length; v++) {
                _this.dispositivos[v].idEvent = idEvento;
                _this.dispositivos[v].cLatitude = nuevo.cLatitude;
                _this.dispositivos[v].cLongitude = nuevo.cLongitude;
                _this.dispositivos[v].zLatitude = nuevo.Latitude;
                _this.dispositivos[v].zLongitude = nuevo.Longitude;
                console.log(_this.dispositivos[v]);
                _this.eventosService.setDispositivoEvento(_this.dispositivos[v]);
            }
            _this.inicializo();
        });
    };
    EventosZonasComponent.prototype.getZonas = function (ciudad) {
        var _this = this;
        this.borrarZonasMapa();
        this.ZonasService.getZonasByCityName(ciudad.Nombre).then(function (zonas) {
            if (zonas) {
                _this.zonas = zonas;
                var _loop_2 = function(z) {
                    var zona = new google.maps.Circle({
                        radius: zonas[z].Radio,
                        center: new google.maps.LatLng(zonas[z].Latitude, zonas[z].Longitude),
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        fillOpacity: 0.35,
                        clickable: true,
                        editable: false,
                        map: _this.map
                    });
                    //Eventos seleccion de la zona mapa.
                    zona.addListener('click', function (e) {
                        for (var c = 0; c < _this.zonasMapa.length; c++) {
                            _this.zonasMapa[c].setOptions({ fillColor: '#FF0000', strokeColor: '#FF0000' });
                        }
                        _this.oEvento.Latitude = zona.getCenter().lat();
                        _this.oEvento.Longitude = zona.getCenter().lng();
                        zona.setOptions({ fillColor: '#013ADF', strokeColor: '#08088A' });
                    });
                    _this.zonasMapa.push(zona);
                };
                for (var z = 0; z < zonas.length; z++) {
                    _loop_2(z);
                }
            }
        });
    };
    EventosZonasComponent = __decorate([
        core_1.Component({
            selector: 'eventosZonas-cmp',
            moduleId: module.id,
            templateUrl: 'eventosZonas.component.html'
        }), 
        __metadata('design:paramtypes', [eventos_service_1.EventosService, tipo_sensor_service_1.TipoSensoresService, ciudades_service_1.CiudadesService, zonas_service_1.ZonasService])
    ], EventosZonasComponent);
    return EventosZonasComponent;
}());
exports.EventosZonasComponent = EventosZonasComponent;
//# sourceMappingURL=eventosZonas.component.js.map
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
var zona_1 = require('./zona');
var zonas_service_1 = require('./zonas.service');
var ZonasComponent = (function () {
    function ZonasComponent(ciudadesService, zonasService, nuevaZona) {
        this.ciudadesService = ciudadesService;
        this.zonasService = zonasService;
        this.nuevaZona = nuevaZona;
        this.nombreCampoCiudad = 'Ciudad de la zona';
        this.CampoCiudad = '';
    }
    ;
    ZonasComponent.prototype.ngOnInit = function () {
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
        //Cargo controlador de zonas.
        //this.capaZonas = new google.maps.drawing.DrawingManager({
        //    drawingMode: google.maps.drawing.OverlayType.CIRCLE,
        //    drawingControl: true,
        //    drawingControlOptions: {
        //        position: google.maps.ControlPosition.TOP_CENTER,
        //        drawingModes: ['circle']
        //        //drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
        //    },
        //    circleOptions: {
        //        //fillColor: '#ffff00',
        //        //fillOpacity: 1,
        //        //strokeWeight: 5,
        //        clickable: true,
        //        editable: true,
        //        zIndex: 1
        //    }
        //});
        //this.capaZonas.setMap(this.map);
        //this.capaZonas.addListener('circlecomplete', (e) => {
        //    e.addListener('click', (r) => {
        //        alert("pos old" + e.getCenter().lat());
        //    });
        //    e.addListener('center_changed', (c) => {
        //        alert(e.getCenter().lat());
        //        var a = this.zonas.find(z => z.lat == e.getCenter().lat() && z.lon == e.getCenter().lng());
        //        console.log(a);
        //        //this.zonas.push(a);
        //    });
        //    this.nuevaZona.lat = e.getCenter().lat();
        //    this.nuevaZona.lon = e.getCenter().lng();
        //    this.nuevaZona.radio = e.getRadius();
        //    this.zonas.push(this.nuevaZona);
        //});
        //Cargo unico circulo.
        this.circle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: this.map,
            radius: 1000,
            clickable: true,
            editable: true,
        });
        //Eventos del circulo
        //this.circle.addListener('center_changed', (c) => {
        //    this.nuevaZona.lat = this.circle.;
        //    //this.nuevaZona.lon = c.latLng.lng();
        //});
        //this.circle.addListener('radius_changed', (r) => {
        //    this.nuevaZona.radio = r.getRadius.lat();
        //});
        //Agregar evento click del mapa
        this.map.addListener('click', function (e) {
            _this.circle.setCenter(e.latLng);
            _this.nuevaZona.lat = e.latLng.lat();
            _this.nuevaZona.lon = e.latLng.lng();
        });
        this.inicializo();
    };
    //---> Funciones internas <---
    ZonasComponent.prototype.inicializo = function () {
        this.circle.setCenter(null);
        this.circle.setRadius(1000);
        this.CampoCiudad = this.nombreCampoCiudad;
        this.nuevaZona.lat = '';
        this.nuevaZona.lon = '';
        this.nuevaZona.radio = '';
        this.nuevaZona.ciudad = '';
        this.getCiudades();
        this.getZonas();
    };
    //---> Funciones de eventos <---
    ZonasComponent.prototype.changeCiudad = function (value) {
        this.CampoCiudad = value.nombre;
        this.nuevaZona.ciudad = value.nombre;
        this.map.setCenter(new google.maps.LatLng(value.lat, value.lon));
    };
    ZonasComponent.prototype.agregarZona = function () {
        this.nuevaZona.lat = this.circle.getCenter().lat();
        this.nuevaZona.lon = this.circle.getCenter().lng();
        this.nuevaZona.radio = this.circle.getRadius();
        if (this.nuevaZona.ciudad != '' && this.nuevaZona.lat != '' && this.nuevaZona.lon != '') {
            this.setZona(this.nuevaZona);
            this.inicializo();
        }
    };
    //---> Funciones de servicios <---
    ZonasComponent.prototype.getCiudades = function () {
        var _this = this;
        this.ciudadesService
            .getCiudades()
            .then(function (ciudades) { return _this.ciudades = ciudades; });
    };
    ZonasComponent.prototype.getZonas = function () {
        var _this = this;
        this.zonasService
            .getZonas()
            .then(function (zonas) { return _this.zonas = zonas; });
    };
    ZonasComponent.prototype.setZona = function (nueva) {
        this.zonasService.setZona(nueva);
    };
    ZonasComponent = __decorate([
        core_1.Component({
            selector: 'zonas-cmp',
            moduleId: module.id,
            templateUrl: 'zonas.component.html'
        }), 
        __metadata('design:paramtypes', [ciudades_service_1.CiudadesService, zonas_service_1.ZonasService, zona_1.Zona])
    ], ZonasComponent);
    return ZonasComponent;
}());
exports.ZonasComponent = ZonasComponent;
//# sourceMappingURL=zonas.component.js.map
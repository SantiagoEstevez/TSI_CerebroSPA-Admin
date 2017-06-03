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
var ciudades_service_1 = require('./ciudades.service');
var CiudadesComponent = (function () {
    function CiudadesComponent(ciudadesService) {
        this.ciudadesService = ciudadesService;
        this.nombreCiudad = '';
    }
    CiudadesComponent.prototype.ngOnInit = function () {
        //this.getUsuarios();
        var _this = this;
        //Cargo autocompletar del search
        var options = {
            types: ['(cities)'],
            componentRestrictions: { country: 'uy' }
        };
        this.autocomplete = new google.maps.places.Autocomplete(document.getElementById("mapsearch"), options);
        //Cargo mapa
        var myLatlng = new google.maps.LatLng(-34.9114282, -56.1725558);
        var mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: false,
            styles: []
        };
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        //Agrega evento - posicionamiento mapa
        this.autocomplete.addListener('place_changed', function (e) {
            var place = _this.autocomplete.getPlace();
            if (place.name != '') {
                var lat = place.geometry.location.lat();
                var lon = place.geometry.location.lng();
                var latlng = new google.maps.LatLng(lat, lon);
                _this.map.setCenter(latlng);
            }
        });
        this.inicializar();
    };
    //---> Funciones de uso interno <---
    CiudadesComponent.prototype.inicializar = function () {
        this.getCiudades();
        this.nombreCiudad = '';
    };
    //---> Funciones de eventos <---
    CiudadesComponent.prototype.agregarCiudad = function () {
        var place = this.autocomplete.getPlace();
        if (place.name != '') {
            var lat = place.geometry.location.lat();
            var lon = place.geometry.location.lng();
            if (!this.ciudades.find(function (item) { return item.lat == lat && item.lon == lon; })) {
                this.setCiudad(place.name, lat, lon);
                this.inicializar();
            }
            else {
                alert("Esta ciudad ya esta en uso.");
            }
        }
    };
    //---> Funciones de servicios <---
    CiudadesComponent.prototype.getCiudades = function () {
        var _this = this;
        this.ciudadesService
            .getCiudades()
            .then(function (ciudades) { return _this.ciudades = ciudades; });
    };
    CiudadesComponent.prototype.getUsuarios = function () {
        var _this = this;
        //this.ciudadesService
        //    .getAll()
        //    .then(ciudades => this.ciudades = ciudades);
        this.ciudadesService.getUsuarios().then(function (ciudades) { return _this.ciudades = ciudades; });
    };
    CiudadesComponent.prototype.setCiudad = function (nombre, lat, lon) {
        nombre = nombre.trim();
        //lat = lat.trim();
        //lon = lon.trim();
        if (!nombre) {
            return;
        }
        this.ciudadesService.create(nombre, lat, lon)
            .then(function (ciudad) {
            //this.ciudades.push(ciudad);
        });
    };
    CiudadesComponent = __decorate([
        core_1.Component({
            selector: 'ciudades-cmp',
            moduleId: module.id,
            templateUrl: 'ciudades.component.html'
        }), 
        __metadata('design:paramtypes', [ciudades_service_1.CiudadesService])
    ], CiudadesComponent);
    return CiudadesComponent;
}());
exports.CiudadesComponent = CiudadesComponent;
//# sourceMappingURL=ciudades.component.js.map
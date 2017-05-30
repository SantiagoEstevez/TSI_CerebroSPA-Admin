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
        //Agregar evento
        //this.map.addListener(this.autocomplete, 'place_changed', (e) => {
        //    var place = this.autocomplete.getPlace();
        //    var ciudad = place.name;
        //    var lat = place.geometry.location.lat();
        //    var lon = place.geometry.location.lng();
        //    var latlng = new google.maps.LatLng(lat, lon);
        //    this.map.setCenter(latlng);
        //    //this.marker.setMap();
        //    //var marker = new google.maps.Marker({
        //    //    position: e.latLng,
        //    //    map: this.map
        //    //});
        //});
        //Agrego el evento
        //google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
        //    this._zone.run(() => {
        //        var place = this.autocomplete.getPlace();
        //        alert(place.geometry.location.lat());
        //        //this.lng = place.geometry.location.lng();
        //    });
        //});
        this.getCiudades();
    };
    CiudadesComponent.prototype.agregarCiudad = function () {
        var place = this.autocomplete.getPlace();
        this.nombreCiudad = place.name;
        if (this.nombreCiudad != '') {
            var lat = place.geometry.location.lat();
            var lon = place.geometry.location.lng();
            this.ciudades.push({ nombre: this.nombreCiudad, lat: lat, lon: lon });
            var latlng = new google.maps.LatLng(lat, lon);
            this.map.setCenter(latlng);
            this.add(this.nombreCiudad, lat, lon);
            this.inicializar();
        }
        //var geocoder = new google.maps.Geocoder();
        //        alert(place.geometry.location.lat());
        //        //this.lng = place.geometry.location.lng();
        //var latlng = new google.maps.LatLng(-34.9114282, -34.9114282);
        //this.map.setCenter(latlng);
        //geocoder.geocode({ 'address': this.nombreCiudad }, function (results, status) {
        //    if (status == 'OK') {
        //        var latlng = new google.maps.LatLng(-34.9114282, -34.9114282);
        //        this.map.setCenter(latlng);
        //        //this.map.setCenter(results[0].geometry.location);
        //        var marker = new google.maps.Marker({
        //            map: this.map,
        //            position: results[0].geometry.location
        //        });
        //    } else {
        //        alert('Geocode was not successful for the following reason: ' + status);
        //    }
        //});
        //Posiciono mapa
        //any map = document.getElementById("map")
        //google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
        //    this._zone.run(() => {
        //        var place = this.autocomplete.getPlace();
        //        mapa.la = place.geometry.location.lat();
        //        mapa.lon = place.geometry.location.lng();
        //    });
        //});
    };
    CiudadesComponent.prototype.inicializar = function () {
        this.nombreCiudad = '';
    };
    CiudadesComponent.prototype.getCiudades = function () {
        var _this = this;
        this.ciudadesService
            .getCiudades()
            .then(function (ciudades) { return _this.ciudades = ciudades; });
    };
    CiudadesComponent.prototype.add = function (nombre, lat, lon) {
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
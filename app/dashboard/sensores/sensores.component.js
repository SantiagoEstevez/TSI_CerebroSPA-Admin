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
var SensoresComponent = (function () {
    function SensoresComponent() {
        this.tipoBase = 'Tipo sensor';
        //Datos que tendrian que ser servicios.
        this.tipoSensores = ['Tipo 1', 'Tipo 2', 'Tipo 3'];
        this.sensores = [];
        //Propiadades
        this.tipo = this.tipoBase;
        this.lat = '';
        this.lon = '';
    }
    SensoresComponent.prototype.inicializo = function () {
        this.lat = '';
        this.lon = '';
        this.tipo = this.tipoBase;
    };
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
            _this.lat = e.latLng.lat();
            _this.lon = e.latLng.lng();
            _this.marker.setPosition(e.latLng);
        });
    };
    SensoresComponent.prototype.dropdownChange = function (value) {
        this.tipo = value;
    };
    SensoresComponent.prototype.agregarSensor = function () {
        if (this.tipo != this.tipoBase && this.lat != '' && this.lon != '') {
            this.sensores.push({ tipo: this.tipo, lat: this.lat, lon: this.lon });
            this.inicializo();
        }
    };
    SensoresComponent = __decorate([
        core_1.Component({
            selector: 'sensores-cmp',
            moduleId: module.id,
            templateUrl: 'sensores.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], SensoresComponent);
    return SensoresComponent;
}());
exports.SensoresComponent = SensoresComponent;
//# sourceMappingURL=sensores.component.js.map
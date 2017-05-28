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
var CiudadesComponent = (function () {
    function CiudadesComponent() {
        //constructor(private _zone: NgZone, private _mapa: MapsComponent) {}
        this.ciudades = [
            { nombre: 'Montevideo', pais: 'Uruguay' },
            { nombre: 'Ciudad de la costa', pais: 'Uruguay' },
            { nombre: 'Ciudad de florida', pais: 'Uruguay' }
        ];
    }
    CiudadesComponent.prototype.ngOnInit = function () {
        var items = ['sss', 'ppp'];
        var options = {
            types: ['(cities)']
        };
        var autocomplete = new google.maps.places.Autocomplete(document.getElementById("mapsearch"), options);
        //google.maps.event.addListener(autocomplete, 'place_changed', () => {
        //    this._zone.run(() => {
        //        var place = autocomplete.getPlace();
        //        //this._mapa. .lat = place.geometry.location.lat();
        //        //this.lng = place.geometry.location.lng();
        //    });
        //});
    };
    CiudadesComponent.prototype.agregarCiudad = function () {
        this.ciudades.push({ nombre: document.getElementById("mapsearch").innerText, pais: 'Uruguay' });
        console.log(this.ciudades);
    };
    CiudadesComponent = __decorate([
        core_1.Component({
            selector: 'ciudades-cmp',
            moduleId: module.id,
            templateUrl: 'ciudades.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], CiudadesComponent);
    return CiudadesComponent;
}());
exports.CiudadesComponent = CiudadesComponent;
//# sourceMappingURL=ciudades.component.js.map
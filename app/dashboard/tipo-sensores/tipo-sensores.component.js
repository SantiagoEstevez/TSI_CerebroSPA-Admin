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
var TipoSensoresComponent = (function () {
    function TipoSensoresComponent() {
        this.dropdownBase = 'Tipo de sensor';
        this.tipoBaseSensores = ['Fuego', 'Trafico', 'Meteorologia', 'Terremoto'];
        this.tipoSensores = [];
        this.nombre = '';
        this.frecuencia = '';
        this.tipoBase = this.dropdownBase;
    }
    TipoSensoresComponent.prototype.ngOnInit = function () {
    };
    TipoSensoresComponent.prototype.dropdownChange = function (value) {
        this.tipoBase = value;
    };
    TipoSensoresComponent.prototype.agregarTipoSensor = function () {
        if (this.tipoBase != this.dropdownBase && this.nombre != '' && this.frecuencia != '') {
            this.tipoSensores.push({ nombre: this.nombre, frecuencia: this.frecuencia, tipo: this.tipoBase });
            this.inicializar();
        }
    };
    TipoSensoresComponent.prototype.inicializar = function () {
        this.nombre = '';
        this.frecuencia = '';
        this.tipoBase = this.dropdownBase;
    };
    TipoSensoresComponent = __decorate([
        core_1.Component({
            selector: 'tipo-sensores-cmp',
            moduleId: module.id,
            templateUrl: 'tipo-sensores.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], TipoSensoresComponent);
    return TipoSensoresComponent;
}());
exports.TipoSensoresComponent = TipoSensoresComponent;
//# sourceMappingURL=tipo-sensores.component.js.map
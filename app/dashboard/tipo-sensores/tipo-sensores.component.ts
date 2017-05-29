import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'tipo-sensores-cmp',
    moduleId: module.id,
    templateUrl: 'tipo-sensores.component.html'
})

export class TipoSensoresComponent implements OnInit {
    dropdownBase: string = 'Tipo de sensor';

    tipoBaseSensores = ['Fuego', 'Trafico', 'Meteorologia', 'Terremoto'];
    tipoSensores = [];

    nombre: string = '';
    frecuencia: string = '';
    tipoBase: string = this.dropdownBase;

    ngOnInit() {
    }

    dropdownChange(value) {
        this.tipoBase = value;
    }

    agregarTipoSensor() {
        if (this.tipoBase != this.dropdownBase && this.nombre != '' && this.frecuencia != '') {
            this.tipoSensores.push({ nombre: this.nombre, frecuencia: this.frecuencia, tipo: this.tipoBase });

            this.inicializar();
        }
    }

    inicializar() {
        this.nombre = '';
        this.frecuencia = '';
        this.tipoBase = this.dropdownBase;
    }
}

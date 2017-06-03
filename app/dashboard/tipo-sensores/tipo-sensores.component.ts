import { Component, OnInit } from '@angular/core';
import { Ciudad } from '../ciudades/Ciudad';
import { CiudadesService } from '../ciudades/ciudades.service';
import { TipoSensoresService } from './tipo-sensor.service';
import { TipoSensor } from './tipo-sensor';
import { TipoBaseSensor } from './tipo-base-sensor';

@Component({
    selector: 'tipo-sensores-cmp',
    moduleId: module.id,
    templateUrl: 'tipo-sensores.component.html'
})

export class TipoSensoresComponent implements OnInit {

    constructor(
        private ciudadesService: CiudadesService,
        private tipoSensoresService: TipoSensoresService,
        private nuevoTipoSensor: TipoSensor
    ){ }

    nombreCampoTS: string = 'Tipo de sensor';
    nombreCampoCiudad: string = 'Ciudad del sensor';

    CampoTS: string = '';
    CampoCiudad: string = '';
    tipoBaseSensores: TipoBaseSensor[];
    tipoSensores: TipoSensor[];
    ciudades: Ciudad[];

    ngOnInit() {
        this.inicializar();
    }


    //---> Funciones internas <---
    inicializar() {
        this.CampoTS = this.nombreCampoTS;
        this.CampoCiudad = this.nombreCampoCiudad;

        this.nuevoTipoSensor.nombre = '';
        this.nuevoTipoSensor.frecuencia = '';
        this.nuevoTipoSensor.tipo = this.nombreCampoTS;
        this.nuevoTipoSensor.ciudadSensor = this.nombreCampoCiudad;

        this.getCiudades();
        this.getTipoSensores();
        this.getTipoBaseSensor();
    }


    //---> Funciones de eventos <---
    changeCiudad(value) {
        this.CampoCiudad = value.nombre;
        this.nuevoTipoSensor.ciudadSensor = value.nombre;
    }

    changeTipoBase(value) {
        this.CampoTS = value.nombre;
        this.nuevoTipoSensor.tipo = value.nombre;
    }

    agregarTipoSensor() {
        var tipo = this.nuevoTipoSensor.tipo;
        var nombre = this.nuevoTipoSensor.nombre;
        var frecuencia = this.nuevoTipoSensor.frecuencia;

        if (tipo != this.nombreCampoTS && nombre != '' && frecuencia != '') {
            this.setTipoSensor(this.nuevoTipoSensor);

            this.inicializar();
        }
    }


    //---> Funciones de servicios <---
    getCiudades(): void {
        this.ciudadesService
            .getCiudades()
            .then(ciudades => this.ciudades = ciudades);
    }

    getTipoSensores(): void {
        this.tipoSensoresService
            .getTipoSensores()
            .then(tipoSensores => this.tipoSensores = tipoSensores);
    }

    setTipoSensor(nuevo: TipoSensor): void {
        nuevo.nombre = nuevo.nombre.trim();

        //if (!nombre) { return; }
        this.tipoSensoresService.setTipoSensor(nuevo)
            .then(t => {//this.ciudades.push(ciudad);
            });
    }

    getTipoBaseSensor(): void {
        this.tipoSensoresService
            .getTipoBaseSensor()
            .then(tipoBaseSensores => this.tipoBaseSensores = tipoBaseSensores);
    }
}

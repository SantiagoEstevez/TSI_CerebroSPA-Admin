import { Component, OnInit, NgZone } from '@angular/core';
import { CiudadesService } from '../ciudades/ciudades.service';
import { TipoSensoresService } from '../tipo-sensores/tipo-sensor.service';
import { TipoSensor } from '../tipo-sensores/tipo-sensor';
import { Ciudad } from '../ciudades/ciudad';
import { Sensor } from './sensor';
import { SensoresService } from './sensores.service';

declare var google: any;

@Component({
    selector: 'sensores-cmp',
    moduleId: module.id,
    templateUrl: 'sensores.component.html'
})

export class SensoresComponent implements OnInit {

    constructor(
        private ciudadesService: CiudadesService,
        private tipoSensoresService: TipoSensoresService,
        private SensoresService: SensoresService,
        private nuevoSensor: Sensor
    ) { };

    nombreCampoTS: string = 'Tipo sensor';
    nombreCampoCiudad: string = 'Ciudad del sensor';

    CampoTS: string = '';
    CampoCiudad: string = '';
    map: any;
    marker: any;

    ciudades: Ciudad[];
    tipoSensores: TipoSensor[];
    sensores: Sensor[];

    ngOnInit() {

        //Cargo mapa
        var myLatlng = new google.maps.LatLng(-34.9114282, -56.1725558);
        var mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: true, //we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: []
        }
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        //Cargo unico marcador
        this.marker = new google.maps.Marker({
            map: this.map
        });

        //Agregar evento
        this.map.addListener('click', (e) => {
            this.nuevoSensor.lat = e.latLng.lat();
            this.nuevoSensor.lon = e.latLng.lng();
            this.marker.setPosition(e.latLng);
        });

        this.inicializo();
    }


    //---> Funciones internas <---
    inicializo() {
        this.CampoTS = this.nombreCampoTS;
        this.CampoCiudad = this.nombreCampoCiudad;

        this.nuevoSensor.lat = '';
        this.nuevoSensor.lon = '';
        this.nuevoSensor.tipo = '';
        this.nuevoSensor.ciudad = '';

        this.getCiudades();
        this.getTipoSensores();
        this.getSensores();
    }


    //---> Funciones de eventos <---
    changeTipoSensor(value) {
        this.CampoTS = value.nombre;
        this.nuevoSensor.tipo = value.nombre;
    }

    changeCiudad(value) {
        this.CampoCiudad = value.nombre;
        this.nuevoSensor.ciudad = value.nombre;
        this.map.setCenter(new google.maps.LatLng(value.lat, value.lon));
    }

    agregarSensor() {
        var ciudad = this.nuevoSensor.ciudad;
        var tipo = this.nuevoSensor.tipo;
        var lat = this.nuevoSensor.lat;
        var lon = this.nuevoSensor.lon;

        if (ciudad != '' && tipo != '' && lat != '' && lon != '') {
            this.setSensor(this.nuevoSensor);

            this.inicializo();
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

    getSensores(): void {
        this.SensoresService
            .getSensores()
            .then(sensores => this.sensores = sensores);
    }

    setSensor(nuevo: Sensor): void {
        this.SensoresService.setSensor(nuevo);
    }
}

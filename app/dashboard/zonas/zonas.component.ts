import { Component, OnInit, NgZone } from '@angular/core';
import { CiudadesService } from '../ciudades/ciudades.service';
import { Ciudad } from '../ciudades/ciudad';
import { Zona } from './zona';
import { ZonasService } from './zonas.service';

declare var google: any;

@Component({
    selector: 'zonas-cmp',
    moduleId: module.id,
    templateUrl: 'zonas.component.html'
})

export class ZonasComponent implements OnInit {

    constructor(
        private ciudadesService: CiudadesService,
        private zonasService: ZonasService,
        private nuevaZona: Zona
    ) { };

    nombreCampoCiudad: string = 'Ciudad de la zona';

    CampoCiudad: string = '';
    map: any;
    capaZonas: any;
    circle: any;
    editar: boolean = false;

    ciudades: Ciudad[];
    zonas: Zona[];

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
        this.map.addListener('click', (e) => {
            this.circle.setCenter(e.latLng);
            this.nuevaZona.lat = e.latLng.lat();
            this.nuevaZona.lon = e.latLng.lng();
        });

        this.inicializo();
    }


    //---> Funciones internas <---
    inicializo() {
        this.circle.setCenter(null);
        this.circle.setRadius(1000);

        this.CampoCiudad = this.nombreCampoCiudad;
        this.editar = false;

        this.nuevaZona.lat = '';
        this.nuevaZona.lon = '';
        this.nuevaZona.radio = '';
        this.nuevaZona.ciudad = '';

        this.getCiudades();
        this.getZonas();
    }


    //---> Funciones de eventos <---
    changeCiudad(value) {
        this.CampoCiudad = value.nombre;
        this.nuevaZona.ciudad = value.nombre;
        this.map.setCenter(new google.maps.LatLng(value.lat, value.lon));
    }

    agregarZona() {
        this.nuevaZona.lat = this.circle.getCenter().lat();
        this.nuevaZona.lon = this.circle.getCenter().lng();
        this.nuevaZona.radio = this.circle.getRadius();

        if (this.nuevaZona.ciudad != '' && this.nuevaZona.lat != '' && this.nuevaZona.lon != '') {
            if (this.editar) {
                this.updateZona(this.nuevaZona);
            }
            this.setZona(this.nuevaZona);

            this.inicializo();
        }
    }

    editarZona(zona: Zona) {
        this.CampoCiudad = zona.ciudad;
        this.circle.setCenter(new google.maps.LatLng(zona.lat, zona.lon));
        this.circle.setRadius(zona.radio);

        this.nuevaZona.lat = zona.lat;
        this.nuevaZona.lon = zona.lon;
        this.nuevaZona.radio = zona.radio;

        this.editar = true;
    }

    eliminarZona(zona) {
        alert("eliminar");
    }


    //---> Funciones de servicios <---
    getCiudades(): void {
        this.ciudadesService
            .getCiudades()
            .then(ciudades => this.ciudades = ciudades);
    }

    getZonas(): void {
        this.zonasService
            .getZonas()
            .then(zonas => this.zonas = zonas);
    }

    setZona(nueva: Zona): void {
        this.zonasService.setZona(nueva);
    }

    updateZona(zona: Zona): void {
        this.zonasService.update(zona);
    }
}

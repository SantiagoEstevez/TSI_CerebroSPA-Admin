import { Component, OnInit, NgZone } from '@angular/core';

declare var google: any;

@Component({
    selector: 'sensores-cmp',
    moduleId: module.id,
    templateUrl: 'sensores.component.html'
})

export class SensoresComponent implements OnInit {
    tipoBase: string = 'Tipo sensor';
    map: any;
    marker: any;

    //Datos que tendrian que ser servicios.
    tipoSensores = ['Tipo 1', 'Tipo 2', 'Tipo 3'];
    sensores = [];

    //Propiadades
    tipo: string = this.tipoBase;
    lat: string = '';
    lon: string = '';

    inicializo() {
        this.lat = '';
        this.lon = '';
        this.tipo = this.tipoBase;
    }

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
            this.lat = e.latLng.lat();
            this.lon = e.latLng.lng();
            this.marker.setPosition(e.latLng);
        });
    }

    dropdownChange(value) {
        this.tipo = value;
    }

    agregarSensor() {
        if (this.tipo != this.tipoBase && this.lat != '' && this.lon != '') {
            this.sensores.push({ tipo: this.tipo, lat: this.lat, lon: this.lon });

            this.inicializo();
        }
    }
}

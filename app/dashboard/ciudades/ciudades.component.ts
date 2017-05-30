import { Component, OnInit, NgZone } from '@angular/core';
import { Ciudad } from './Ciudad';
import { CiudadesService } from './ciudades.service';

//import { MapsComponent } from '../maps/maps.component';
//import {
//    MapsAPILoader,
//    NoOpMapsAPILoader,
//    MouseEvent,
//} from 'angular2-google-maps/core';

declare var google: any;

@Component({
    selector: 'ciudades-cmp',
    moduleId: module.id,
    templateUrl: 'ciudades.component.html'
})

export class CiudadesComponent implements OnInit {

    constructor(private ciudadesService: CiudadesService) { }

    autocomplete: any;
    map: any;
    nombreCiudad: string = '';
    ciudades: Ciudad[];

    ngOnInit() {

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
            scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: []
        }
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
        
    }

    agregarCiudad() {
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
    }

    inicializar() {
        this.nombreCiudad = '';
    }

    getCiudades(): void {
        this.ciudadesService
            .getCiudades()
            .then(ciudades => this.ciudades = ciudades);
    }

    add(nombre: string, lat: string, lon: string): void {
        nombre = nombre.trim();
        //lat = lat.trim();
        //lon = lon.trim();

        if (!nombre) { return; }
        this.ciudadesService.create(nombre, lat, lon)
            .then(ciudad => {
                //this.ciudades.push(ciudad);
            });
    }
}

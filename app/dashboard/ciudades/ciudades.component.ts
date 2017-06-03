import { Component, OnInit, NgZone } from '@angular/core';
import { Ciudad } from './Ciudad';
import { CiudadesService } from './ciudades.service';

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
    public ciudades: Ciudad[];
    usuarios: string[];

    ngOnInit() {
        //this.getUsuarios();

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

        //Agrega evento - posicionamiento mapa
        this.autocomplete.addListener('place_changed', (e) => {
            var place = this.autocomplete.getPlace();

            if (place.name != '') {
                var lat = place.geometry.location.lat();
                var lon = place.geometry.location.lng();

                var latlng = new google.maps.LatLng(lat, lon);
                this.map.setCenter(latlng);
            }
        });

        this.inicializar();
    }


    //---> Funciones de uso interno <---
    inicializar() {
        this.getCiudades();
        this.nombreCiudad = '';
    }


    //---> Funciones de eventos <---
    agregarCiudad() {
        var place = this.autocomplete.getPlace();   

        if (place.name != '') {
            var lat = place.geometry.location.lat();
            var lon = place.geometry.location.lng();

            if (!this.ciudades.find(item => item.lat == lat && item.lon == lon)) {
                this.setCiudad(place.name, lat, lon);
                this.inicializar();
            } else {
                alert("Esta ciudad ya esta en uso.");
            }
        }
    }    


    //---> Funciones de servicios <---
    getCiudades(): void {
        this.ciudadesService
            .getCiudades()
            .then(ciudades => this.ciudades = ciudades);
    }

    getUsuarios(): void {
        //this.ciudadesService
        //    .getAll()
        //    .then(ciudades => this.ciudades = ciudades);
        this.ciudadesService.getUsuarios().then(ciudades => this.ciudades = ciudades);
    }

    setCiudad(nombre: string, lat: string, lon: string): void {
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

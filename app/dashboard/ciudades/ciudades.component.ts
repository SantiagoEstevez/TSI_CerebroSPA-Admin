import { Component, OnInit, NgZone, NgModule } from '@angular/core';
import { MapsComponent } from '../maps/maps.component';
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
    _zone: NgZone;
    _mapa: MapsComponent;
    //constructor(private _zone: NgZone, private _mapa: MapsComponent) {}
    
    public ciudades = [
        { nombre: 'Montevideo', pais: 'Uruguay' },
        { nombre: 'Ciudad de la costa', pais: 'Uruguay' },
        { nombre: 'Ciudad de florida', pais: 'Uruguay' }
    ];

    ngOnInit() {
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
    }

    agregarCiudad() {
        this.ciudades.push({ nombre: document.getElementById("mapsearch").innerText , pais: 'Uruguay' });
        console.log(this.ciudades);
    }
}

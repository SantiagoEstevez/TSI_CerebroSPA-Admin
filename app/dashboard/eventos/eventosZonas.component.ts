import { Component, OnInit } from '@angular/core';

//Clases
import { Evento } from './evento';
import { Dispositivo } from './dispositivo';
import { TipoBaseSensor } from '../tipo-sensores/tipo-base-sensor';
import { Ciudad } from '../ciudades/ciudad'
import { Zona } from '../zonas/zona'
import { Sensor } from '../sensores/sensor'

//Servicios.
import { EventosService } from './eventos.service';
import { TipoSensoresService } from '../tipo-sensores/tipo-sensor.service';
import { CiudadesService } from '../ciudades/ciudades.service'
import { ZonasService } from '../zonas/zonas.service'
import { SensoresService } from '../sensores/sensores.service'

declare var google: any;

@Component({
    selector: 'eventosZonas-cmp',
    moduleId: module.id,
    templateUrl: 'eventosZonas.component.html'
})

export class EventosZonasComponent implements OnInit {

    constructor(
        private eventosService: EventosService,
        private tipoSensoresService: TipoSensoresService,
        private CiudadesService: CiudadesService,
        private ZonasService: ZonasService,
        private SensoresService: SensoresService
    ) { };

    //Nombres
    nombreCampoCiudad: string = 'Ciudad del evento';
    nombreCampoTS: string = 'Tipo sensor';
    nombreCampoRegla: string = "Regla";
    CampoCiudad: string = this.nombreCampoCiudad;
    CampoTS: string = '';
    CampoRegla: string = '';
    
    //Objetos
    oEvento: Evento;
    oDispositivo: Dispositivo;
    map: any;

    //Listas de objetos
    ciudades: Ciudad[];
    tipoSensores: TipoBaseSensor[];
    eventos: Evento[];
    dispositivos: Dispositivo[];
    sensores: Sensor[];
    sensoresMapa: any[];
    zonas: Zona[];
    zonasMapa: any[];
    reglas: string[] = [">=", "<="];


    ngOnInit() {
        //Cargo mapa
        var myLatlng = new google.maps.LatLng(-34.9114282, -56.1725558);
        var mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: []
        }
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        this.inicializo();
    }

    //---> Funciones internas <---
    inicializo() {
        this.CampoCiudad = this.nombreCampoCiudad;

        this.oEvento = new Evento();
        this.eventos = [];
        this.dispositivos = [];
        this.sensores = [];
        this.sensoresMapa = [];
        this.zonas = [];
        this.zonasMapa = [];
        this.inicializoDispositivo();

        this.borrarSensoresMapa();
        this.borrarZonasMapa();
        this.getCiudades();
        this.getTipoSensores();   
    }

    inicializoDispositivo() {
        this.CampoTS = this.nombreCampoTS;
        this.CampoRegla = this.nombreCampoRegla;
        this.oDispositivo = new Dispositivo();
    }

    borrarZonasMapa() {
        for (let i = 0; i < this.zonasMapa.length; i++) {
            this.zonasMapa[i].setMap(null);
        }
        this.zonasMapa = [];
    }

    borrarSensoresMapa() {
        for (let i = 0; i < this.sensoresMapa.length; i++) {
            this.sensoresMapa[i].setMap(null);
        }
        this.sensoresMapa = [];
    }


    //---> Funciones de eventos <---
    agregarEvento() {
        if (this.dispositivos.length > 0) {
            if (this.oEvento.Nombre != "") {
                if (!isNaN(this.oEvento.Latitude) && !isNaN(this.oEvento.Longitude)) {
                    this.oEvento.SendoresAsociados = this.dispositivos;
                    //this.oEvento.SendoresAsociados.push({ ID: 1, Tipo: "Agua", Latitude: 1, Longitude: 1, Umbral: "> 900" });
                    this.setEvento(this.oEvento);
                } else {
                    alert("Debe seleccionar una zona.");
                }
            } else {
                alert("Debe asignarle un nombre al evento.");
            }
        } else {
            alert("El evento debe tener alguna regla asociada.");
        }
    }

    editarEvento() {
        alert("editando evento");
    }

    eliminarEvento() {
        alert("eliminando evento");
    }

    agregarDispositivo() {
        if (this.oDispositivo.Regla == ">=" || this.oDispositivo.Regla == "<=") {
            if (!isNaN(this.oDispositivo.Medida)) {
                if (this.oDispositivo.Tipo != undefined && this.oDispositivo.Tipo != this.nombreCampoTS) {
                    this.oDispositivo.Umbral = this.oDispositivo.Regla + " " + this.oDispositivo.Medida;
                    this.oDispositivo.cLatitude = this.oEvento.cLatitude;
                    this.oDispositivo.cLongitude = this.oEvento.cLongitude;
                    this.dispositivos.push(this.oDispositivo);
                    this.inicializoDispositivo();
                } else {
                    alert("Debe seleccionar un tipo de sensor.");
                }
            } else {
                alert("La medida debe ser numerica.");
            }
        } else {
            alert("La regla debe ser >= o <=");
        }
    }

    eliminarDispositivo(dispositivo: Dispositivo) {
        let index: number = this.dispositivos.indexOf(dispositivo);
        if (index !== -1) {
            this.dispositivos.splice(index, 1);
        }  
    }

    changeCiudad(ciudad: Ciudad) {
        this.CampoCiudad = ciudad.Nombre;

        this.oEvento.ciudad = ciudad.Nombre;
        this.oEvento.cLatitude = ciudad.Latitud;
        this.oEvento.cLongitude = ciudad.Longitud;

        this.map.setCenter(new google.maps.LatLng(ciudad.Latitud, ciudad.Longitud));
        this.getZonas(ciudad);
        this.getSensores(ciudad);
    }

    changeTipoSensor(tipoSensor: TipoBaseSensor) {
        this.CampoTS = tipoSensor.nombre;
        this.oDispositivo.Tipo = tipoSensor.nombre;
    }

    changeRegla(regla: string) {
        this.CampoRegla = regla;
        this.oDispositivo.Regla = regla;
    }


    //---> Funciones de servicios <---
    getCiudades() {
        this.CiudadesService.getCiudades(localStorage.getItem('username')).then(ciudades => {
            this.ciudades = ciudades;
            this.getEventos();
        });
    }

    getEventos(): void {
        for (let i = 0; i < this.ciudades.length; i++) {
            let nombre = this.ciudades[i].Nombre;

            //Por nombre ciudad
            //this.eventosService.getEventosZona(this.ciudades[i].Latitud, this.ciudades[i].Longitud).then(eventos => {
            //    if (eventos) {
            //        for (var e = 0; e < eventos.length; e++) {
            //            if (!eventos[e].SendoresAsociados) {
            //                eventos[e].SendoresAsociados = [];
            //            }
            //            this.eventos.push(eventos[e]);
            //        }
            //    }
            //});

            //Por nombre ciudad
            this.eventosService.getEventosZonaByCityName(nombre).then(eventos => {
                if (eventos) {
                    for (var e = 0; e < eventos.length; e++) {
                        if (!eventos[e].SendoresAsociados) {
                            eventos[e].ciudad = nombre;
                            eventos[e].SendoresAsociados = [];
                        }
                        this.eventos.push(eventos[e]);
                    }
                }
            });
        }
    }
    
    getTipoSensores(): void {
        this.tipoSensoresService.getTipoBaseSensor().then(tipoSensores => this.tipoSensores = tipoSensores);
    }

    getSensores(ciudad: Ciudad): void {
        this.SensoresService.getSensoresByCityName(ciudad.Nombre).subscribe(sensores => {
            this.sensores = sensores

            for (var i = 0; i < this.sensores.length; i++) {
                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(this.sensores[i].Latitude, this.sensores[i].Longitude),
                    title: this.sensores[i].Tipo,
                    map: this.map
                });

                this.sensoresMapa.push(marker);
            }
        });
    }

    setEvento(nuevo: Evento): void {
        this.eventosService.setEventoZona(nuevo).then(res => {
            let idEvento: number = Number(res);
            for (let v = 0; v < this.dispositivos.length; v++) {
                this.dispositivos[v].idEvent = idEvento;
                this.dispositivos[v].cLatitude = nuevo.cLatitude;
                this.dispositivos[v].cLongitude = nuevo.cLongitude;
                this.dispositivos[v].zLatitude = nuevo.Latitude;
                this.dispositivos[v].zLongitude = nuevo.Longitude;
                console.log(this.dispositivos[v]);

                this.eventosService.setDispositivoEvento(this.dispositivos[v]);
            }
            this.inicializo();
        });
    }

    getZonas(ciudad: Ciudad): void {
        this.borrarZonasMapa();

        this.ZonasService.getZonasByCityName(ciudad.Nombre).then(zonas => {
            if (zonas) {
                this.zonas = zonas;

                for (let z = 0; z < zonas.length; z++) {
                    let zona = new google.maps.Circle({
                        radius: zonas[z].Radio,
                        center: new google.maps.LatLng(zonas[z].Latitude, zonas[z].Longitude),
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        fillOpacity: 0.35,
                        clickable: true,
                        editable: false,
                        map: this.map
                    });

                    //Eventos seleccion de la zona mapa.
                    zona.addListener('click', (e) => {
                        for (let c = 0; c < this.zonasMapa.length; c++) {
                            this.zonasMapa[c].setOptions({ fillColor: '#FF0000', strokeColor: '#FF0000' });
                        }
                        this.oEvento.Latitude = zona.getCenter().lat();
                        this.oEvento.Longitude = zona.getCenter().lng();
                        zona.setOptions({ fillColor: '#013ADF', strokeColor: '#08088A' });
                    });

                    this.zonasMapa.push(zona);
                }
            }
        });
    }
}

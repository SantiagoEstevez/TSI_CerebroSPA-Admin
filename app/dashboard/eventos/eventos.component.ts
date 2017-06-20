import { Component, OnInit } from '@angular/core';

//Clases
import { Evento } from './evento';
import { Dispositivo } from './dispositivo';
import { TipoBaseSensor } from '../tipo-sensores/tipo-base-sensor';
import { Ciudad } from '../ciudades/ciudad'

//Servicios.
import { EventosService } from './eventos.service';
import { TipoSensoresService } from '../tipo-sensores/tipo-sensor.service';
import { CiudadesService } from '../ciudades/ciudades.service'

@Component({
    selector: 'eventos-cmp',
    moduleId: module.id,
    templateUrl: 'eventos.component.html'
})

export class EventosComponent implements OnInit {

    constructor(
        private eventosService: EventosService,
        private tipoSensoresService: TipoSensoresService,
        private CiudadesService: CiudadesService
    ) { };

    //Nombres
    nombreCampoCiudad: string = 'Ciudad del sensor';
    nombreCampoTS: string = 'Tipo sensor';
    CampoCiudad: string = this.nombreCampoCiudad;
    CampoTS: string = '';
    
    //Objetos
    oEvento: Evento;
    oDispositivo: Dispositivo;

    //Listas de objetos
    ciudades: Ciudad[];
    tipoSensores: TipoBaseSensor[];
    eventos: Evento[];
    dispositivos: Dispositivo[];


    ngOnInit() {
        this.inicializo();
    }

    //---> Funciones internas <---
    inicializo() {
        this.CampoCiudad = this.nombreCampoCiudad;

        this.oEvento = new Evento();
        this.dispositivos = [];
        this.inicializoDispositivo();

        this.getCiudades();
        this.getTipoSensores();   
    }

    inicializoDispositivo() {
        this.CampoTS = this.nombreCampoTS;
        this.oDispositivo = new Dispositivo();
    }


    //---> Funciones de eventos <---
    agregarEvento() {
        if (this.dispositivos.length > 0) {
            if (this.oEvento.Name != "") {
                this.oEvento.DataSources = this.dispositivos;
                this.setEvento(this.oEvento);
                this.inicializo();
            } else {
                alert("Debe asignarle un nombre al evento.");
            }
        } else {
            alert("El evento debe tener por lo menos un tipo de sensor asociado.");
        }
    }

    editarEvento() {
        alert("editando evento");
    }

    eliminarEvento() {
        alert("eliminando evento");
    }

    agregarDispositivo() {
        if (this.oDispositivo.Umbral != "" && this.oDispositivo.Tipo != "") {
            this.dispositivos.push(this.oDispositivo);
            this.inicializoDispositivo();
        } else {
            alert("Debe seleccionar el tipo y el humbral.");
        }
    }

    eliminarDispositivo() {
        alert("eliminando de la lista >D");
    }

    changeCiudad(ciudad: Ciudad) {
        this.CampoCiudad = ciudad.Nombre;
        //this.nuevoSensor.ciudad = ciudad.Nombre;
        //this.nuevoSensor.cLatitude = ciudad.Latitud;
        //this.nuevoSensor.cLongitude = ciudad.Longitud;
    }

    changeTipoSensor(tipoSensor: TipoBaseSensor) {
        this.CampoTS = tipoSensor.nombre;
        this.oDispositivo.Tipo = tipoSensor.nombre;
    }


    //---> Funciones de servicios <---
    getCiudades() {
        this.CiudadesService.getCiudades().then(ciudades => {
            this.ciudades = ciudades;
            //this.getEventos();
        });
    }

    getEventos(): void {
        for (var i = 0; i < this.ciudades.length; i++) {
            let nombre = this.ciudades[i].Nombre;

            this.eventosService.getEventos(this.ciudades[i].Latitud, this.ciudades[i].Longitud).then(eventos => {
                for (var e = 0; e < eventos.length; e++) {
                    this.eventos.push(eventos[e]);
                }
                this.eventos = eventos
            });
        }
    }
    
    getTipoSensores(): void {
        this.tipoSensoresService.getTipoBaseSensor().then(tipoSensores => this.tipoSensores = tipoSensores);
    }

    setEvento(nuevo: Evento): void {
        this.eventosService
            .setEvento(nuevo);
    }
}

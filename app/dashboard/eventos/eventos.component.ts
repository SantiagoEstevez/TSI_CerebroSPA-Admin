import { Component, OnInit } from '@angular/core';
import { TipoSensoresService } from '../tipo-sensores/tipo-sensor.service';
import { TipoSensor } from '../tipo-sensores/tipo-sensor';
import { Evento } from './evento';
import { Dispositivo } from './dispositivo';
import { EventosService } from './eventos.service';

@Component({
    selector: 'eventos-cmp',
    moduleId: module.id,
    templateUrl: 'eventos.component.html'
})

export class EventosComponent implements OnInit {

    constructor(
        private eventosService: EventosService,
        private tipoSensoresService: TipoSensoresService
    ) { };

    //Nombres
    nombreCampoTS: string = 'Tipo sensor';
    CampoTS: string = '';

    //Objetos
    oEvento: Evento;
    oDispositivo: Dispositivo;

    //Listas de objetos
    tipoSensores: TipoSensor[];
    eventos: Evento[];
    dispositivos: Dispositivo[];


    ngOnInit() {
        this.inicializo();
    }

    //---> Funciones internas <---
    inicializo() {
        this.oEvento = new Evento();
        this.dispositivos = [];
        
        this.inicializoDispositivo();
        this.getTipoSensores();   
        this.getEventos();
    }

    inicializoDispositivo() {
        this.CampoTS = this.nombreCampoTS;
        this.oDispositivo = new Dispositivo();
    }


    //---> Funciones de eventos <---
    agregarEvento() {
        if (this.dispositivos.length > 0) {
            if (this.oEvento.nombre != "") {
                this.oEvento.dispositivos = this.dispositivos;
                this.setEvento(this.oEvento);
                this.inicializo();
            } else {
                alert("Debe asignarle un nombre al evento.");
            }
        } else {
            alert("El evento debe tener por lo menos un tipo de sensor asociado.");
        }
    }

    agregarDispositivo() {
        if (this.oDispositivo.regla != "" && this.oDispositivo.tipo != "") {
            this.dispositivos.push(this.oDispositivo);
            this.inicializoDispositivo();
        } else {
            alert("Debe seleccionar el tipo y la regla.");
        }
    }

    eliminarDispositivo() {
        alert("eliminando de la lista >D");
    }

    changeTipoSensor(tipoSensor: TipoSensor) {
        this.CampoTS = tipoSensor.nombre;
        this.oDispositivo.tipo = tipoSensor.nombre;
    }

    editarEvento() {
        alert("editando evento");
    }

    eliminarEvento() {
        alert("eliminando evento");
    }

    //---> Funciones de servicios <---
    getTipoSensores(): void {
        this.tipoSensoresService
            .getTipoSensores()
            .then(tipoSensores => this.tipoSensores = tipoSensores);
    }

    getEventos(): void {
        this.eventosService
            .getEventos()
            .then(eventos => this.eventos = eventos);
    }

    setEvento(nuevo: Evento): void {
        this.eventosService
            .setEvento(nuevo);
    }
}

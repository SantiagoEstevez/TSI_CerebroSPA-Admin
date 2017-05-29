import { Component } from '@angular/core';

@Component({
    selector: 'eventos-cmp',
    moduleId: module.id,
    templateUrl: 'eventos.component.html'
})

export class EventosComponent {
    nombre: string = '';
    regla: string = '';

    agregarEvento() {
        alert("Agregando evento >D");
    }
}

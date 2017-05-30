import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './dashboard.routes';

import { CiudadesService } from './ciudades/ciudades.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MemoriaService } from './ciudades/memoria.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(MODULE_ROUTES),
        InMemoryWebApiModule.forRoot(MemoriaService),
    ],
    declarations: [MODULE_COMPONENTS],
    providers: [CiudadesService]
})

export class DashboardModule{}

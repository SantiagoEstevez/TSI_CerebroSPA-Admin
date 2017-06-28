"use strict";
var home_component_1 = require('./home/home.component');
var user_component_1 = require('./user/user.component');
var icons_component_1 = require('./icons/icons.component');
var table_component_1 = require('./table/table.component');
var notifications_component_1 = require('./notifications/notifications.component');
var typography_component_1 = require('./typography/typography.component');
var maps_component_1 = require('./maps/maps.component');
var upgrade_component_1 = require('./upgrade/upgrade.component');
var ciudades_component_1 = require('./ciudades/ciudades.component');
var eventos_component_1 = require('./eventos/eventos.component');
var eventosZonas_component_1 = require('./eventos/eventosZonas.component');
var tipo_sensores_component_1 = require('./tipo-sensores/tipo-sensores.component');
var sensores_component_1 = require('./sensores/sensores.component');
var zonas_component_1 = require('./zonas/zonas.component');
var login_component_1 = require('./login/login.component');
var auth_guard_1 = require('./auth.guard');
exports.MODULE_ROUTES = [
    //{ path: 'dashboard', component: HomeComponent },
    { path: 'maps', component: maps_component_1.MapsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'Ciudades', component: ciudades_component_1.CiudadesComponent, canActivate: [auth_guard_1.AuthGuard] },
    //{ path: 'TipoSensores', component: TipoSensoresComponent },
    { path: 'Sensores', component: sensores_component_1.SensoresComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'Zonas', component: zonas_component_1.ZonasComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'Eventos', component: eventos_component_1.EventosComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'EventosZonas', component: eventosZonas_component_1.EventosZonasComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'notifications', component: notifications_component_1.NotificationsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'login', component: login_component_1.LoginComponent },
    //{ path: 'user', component: UserComponent },
    //{ path: 'table', component: TableComponent },
    //{ path: 'icons', component: IconsComponent },
    //{ path: 'typography', component: TypographyComponent },
    //{ path: 'upgrade', component: UpgradeComponent },
    { path: '', redirectTo: 'maps', pathMatch: 'full' }
];
exports.MODULE_COMPONENTS = [
    login_component_1.LoginComponent,
    home_component_1.HomeComponent,
    user_component_1.UserComponent,
    table_component_1.TableComponent,
    icons_component_1.IconsComponent,
    notifications_component_1.NotificationsComponent,
    typography_component_1.TypographyComponent,
    maps_component_1.MapsComponent,
    upgrade_component_1.UpgradeComponent,
    ciudades_component_1.CiudadesComponent,
    eventos_component_1.EventosComponent,
    eventosZonas_component_1.EventosZonasComponent,
    tipo_sensores_component_1.TipoSensoresComponent,
    sensores_component_1.SensoresComponent,
    zonas_component_1.ZonasComponent
];
//# sourceMappingURL=dashboard.routes.js.map
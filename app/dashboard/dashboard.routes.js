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
exports.MODULE_ROUTES = [
    { path: 'dashboard', component: home_component_1.HomeComponent },
    //{ path: 'user', component: UserComponent },
    //{ path: 'table', component: TableComponent },
    { path: 'Ciudades', component: ciudades_component_1.CiudadesComponent },
    { path: 'TipoSensores', component: table_component_1.TableComponent },
    { path: 'Sensores', component: table_component_1.TableComponent },
    { path: 'Eventos', component: eventos_component_1.EventosComponent },
    //{ path: 'icons', component: IconsComponent },
    { path: 'notifications', component: notifications_component_1.NotificationsComponent },
    //{ path: 'typography', component: TypographyComponent },
    { path: 'maps', component: maps_component_1.MapsComponent },
    //{ path: 'upgrade', component: UpgradeComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
exports.MODULE_COMPONENTS = [
    home_component_1.HomeComponent,
    user_component_1.UserComponent,
    table_component_1.TableComponent,
    icons_component_1.IconsComponent,
    notifications_component_1.NotificationsComponent,
    typography_component_1.TypographyComponent,
    maps_component_1.MapsComponent,
    upgrade_component_1.UpgradeComponent,
    ciudades_component_1.CiudadesComponent,
    eventos_component_1.EventosComponent
];
//# sourceMappingURL=dashboard.routes.js.map
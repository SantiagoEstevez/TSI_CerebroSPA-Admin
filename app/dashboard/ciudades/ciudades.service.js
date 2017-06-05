"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var CiudadesService = (function () {
    function CiudadesService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.Url = 'api/ciudades'; // URL to web api
    }
    CiudadesService.prototype.getUsuarios = function () {
        return this.http.get('http://localhost:6346/api/usuario/')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CiudadesService.prototype.getAll = function () {
        var _this = this;
        return new Promise(function (resolve) {
            // Simulate server latency with 2 second delay
            setTimeout(function () { return resolve(_this.getUsuarios()); }, 4000);
        });
    };
    //getUsuarios(): Observable<Ciudad[]> {
    //    return this.http.get('http://localhost:6346/api/usuario')
    //        .map(response => response.json().data as Ciudad[])
    //        .catch(this.handleError);
    //}
    //private extractData(res: Response) {
    //    let body = res.json();
    //    return body.data || {};
    //}
    //private handleError(error: Response | any) {
    //    // In a real world app, you might use a remote logging infrastructure
    //    let errMsg: string;
    //    if (error instanceof Response) {
    //        const body = error.json() || '';
    //        const err = body.error || JSON.stringify(body);
    //        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    //    } else {
    //        errMsg = error.message ? error.message : error.toString();
    //    }
    //    console.error(errMsg);
    //    return Observable.throw(errMsg);
    //}
    CiudadesService.prototype.getCiudades = function () {
        return this.http.get(this.Url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    CiudadesService.prototype.getCiudad = function (id) {
        var url = this.Url + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    CiudadesService.prototype.delete = function (id) {
        var url = this.Url + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    CiudadesService.prototype.setCiudad = function (nuevaCiudad) {
        return this.http
            .post(this.Url, JSON.stringify(nuevaCiudad), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    //update(hero: Ciudades): Promise<Ciudades> {
    //    const url = `${this.heroesUrl}/${hero.id}`;
    //    return this.http
    //        .put(url, JSON.stringify(hero), { headers: this.headers })
    //        .toPromise()
    //        .then(() => hero)
    //        .catch(this.handleError);
    //}
    CiudadesService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    CiudadesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CiudadesService);
    return CiudadesService;
}());
exports.CiudadesService = CiudadesService;
//# sourceMappingURL=ciudades.service.js.map
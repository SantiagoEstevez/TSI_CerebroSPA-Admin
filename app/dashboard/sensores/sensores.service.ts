import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Sensor } from './sensor';

@Injectable()
export class SensoresService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = 'api/sensores';  // URL to web api

    constructor(private http: Http) { }

    //--> Tipo de sensores <--
    getSensores(): Promise<Sensor[]> {
        return this.http.get(this.url)
            .toPromise()
            .then(response => response.json().data as Sensor[])
            .catch(this.handleError);
    }

    getTipoSensor(id: number): Promise<Sensor> {
        const url = `${this.url}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Sensor)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.url}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    setSensor(nurevoSensor: Sensor): Promise<Sensor> {
        return this.http
            .post(this.url, JSON.stringify(nurevoSensor), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as Sensor)
            .catch(this.handleError);
    }

    //update(hero: Ciudades): Promise<Ciudades> {
    //    const url = `${this.heroesUrl}/${hero.id}`;
    //    return this.http
    //        .put(url, JSON.stringify(hero), { headers: this.headers })
    //        .toPromise()
    //        .then(() => hero)
    //        .catch(this.handleError);
    //}


    //---> Tipo base de sensores <---
    getTipoBaseSensor(): Promise<Sensor[]> {
        return this.http.get('api/tiposbaseensores')
            .toPromise()
            .then(response => response.json().data as Sensor[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
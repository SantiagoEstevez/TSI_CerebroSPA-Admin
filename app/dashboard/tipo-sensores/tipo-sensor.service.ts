import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { TipoSensor } from './tipo-sensor';
import { TipoBaseSensor } from './tipo-base-sensor';

@Injectable()
export class TipoSensoresService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = 'api/tiposensores';  // URL to web api

    constructor(private http: Http) { }

    //--> Tipo de sensores <--
    getTipoSensores(): Promise<TipoSensor[]> {
        return this.http.get(this.url)
            .toPromise()
            .then(response => response.json().data as TipoSensor[])
            .catch(this.handleError);
    }

    getTipoSensor(id: number): Promise<TipoSensor> {
        const url = `${this.url}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as TipoSensor)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.url}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    setTipoSensor(nurevoTipoSensor: TipoSensor): Promise<TipoSensor> {
        return this.http
            .post(this.url, JSON.stringify(nurevoTipoSensor), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as TipoSensor)
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
    getTipoBaseSensor(): Promise<TipoBaseSensor[]> {
        return this.http.get('api/tiposbaseensores')
            .toPromise()
            .then(response => response.json().data as TipoBaseSensor[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
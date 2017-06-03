import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';  
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Ciudad } from './ciudad';
import { MemoriaService } from './memoria.service'

@Injectable()
export class CiudadesService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private Url = 'api/ciudades';  // URL to web api

    constructor(private http: Http) { }

    getUsuarios(): Promise<Ciudad[]> {
        return this.http.get('http://localhost:6346/api/usuario/')
            .toPromise()
            .then(response => response.json() as Ciudad[])
            .catch(this.handleError);
    }

    getAll(): Promise<Ciudad[]> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getUsuarios()), 4000);
        });
    }

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

    

    getCiudades(): Promise<Ciudad[]> {
        return this.http.get(this.Url)
            .toPromise()
            .then(response => response.json().data as Ciudad[])
            .catch(this.handleError);
    }

    getHero(id: number): Promise<Ciudad> {
        const url = `${this.Url}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Ciudad)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.Url}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(nombre: string, lat: string, lon: string): Promise<Ciudad> {
        return this.http
            .post(this.Url, JSON.stringify({ nombre: nombre, lat: lat, lon: lon }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as Ciudad)
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

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
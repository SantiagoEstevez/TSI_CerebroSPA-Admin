import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';  
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Ciudad } from './ciudad';
import { MemoriaService } from './memoria.service'

@Injectable()
export class CiudadesService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private heroesUrl = 'api/ciudades';  // URL to web api

    constructor(private http: Http) { }

    getCiudades(): Promise<Ciudad[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Ciudad[])
            .catch(this.handleError);
    }

    getHero(id: number): Promise<Ciudad> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Ciudad)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(nombre: string, lat: string, lon: string): Promise<Ciudad> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({ nombre: nombre, lat: lat, lon: lon }), { headers: this.headers })
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
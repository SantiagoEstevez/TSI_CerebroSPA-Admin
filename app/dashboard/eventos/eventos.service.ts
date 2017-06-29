import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Evento } from './evento';
import { Dispositivo } from './dispositivo';

@Injectable()
export class EventosService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    //private url = 'api/evento';  // URL to web api
    private url = 'http://localhost:6346/api/Evento/Global/';
    private urlZona = 'http://localhost:6346/api/Evento/Zone/';

    constructor(private http: Http) { }

    getEventos(lat: number, lon: number): Promise<Evento[]> {
        const url = `${this.url}cityLat/${lat}/cityLon/${lon}/`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Evento[])
            .catch(this.handleError);
    }

    getEventosByCityName(nombreCiudad: string): Promise<Evento[]> {
        const url = `${this.url}${nombreCiudad}/`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Evento[])
            .catch(this.handleError);
    }

    getEventosZona(lat: number, lon: number): Promise<Evento[]> {
        const url = `${this.urlZona}cityLat/${lat}/cityLon/${lon}/`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Evento[])
            .catch(this.handleError);
    }

    getEventosZonaByCityName(nombreCiudad: string): Promise<Evento[]> {
        const url = `${this.urlZona}${nombreCiudad}/`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Evento[])
            .catch(this.handleError);
    }

    //getEvento(id: number): Promise<Evento> {
    //    const url = `${this.url}/${id}`;
    //    return this.http.get(url)
    //        .toPromise()
    //        .then(response => response.json().data as Evento)
    //        .catch(this.handleError);
    //}

    //delete(id: number): Promise<void> {
    //    const url = `${this.url}/${id}`;
    //    return this.http.delete(url, { headers: this.headers })
    //        .toPromise()
    //        .then(() => null)
    //        .catch(this.handleError);
    //}

    setEvento(nurevoEvento: Evento): Promise<string> {
        console.log("seteando evento");
        return this.http
            .post(this.url, JSON.stringify(nurevoEvento), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    setDispositivoEvento(dispositivo: Dispositivo): Promise<Dispositivo> {
        console.log("seteando dispo en evento");
        return this.http
            .post('http://localhost:6346/api/Sensor/ToEvent/', JSON.stringify(dispositivo), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Dispositivo)
            .catch(this.handleError);
    }

    setEventoZona(nurevoEvento: Evento): Promise<string> {
        return this.http
            .post(this.urlZona, JSON.stringify(nurevoEvento), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    //update(evento: Evento): Promise<Evento> {
    //    const url = `${this.url}/${evento.Name}`;
    //    return this.http
    //        .put(url, JSON.stringify(evento), { headers: this.headers })
    //        .toPromise()
    //        .then(() => evento)
    //        .catch(this.handleError);
    //}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
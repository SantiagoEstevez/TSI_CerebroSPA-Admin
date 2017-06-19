import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Evento } from './evento';

@Injectable()
export class EventosService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = 'api/evento';  // URL to web api

    constructor(private http: Http) { }

    //--> Tipo de sensores <--
    getEventos(): Promise<Evento[]> {
        return this.http.get(this.url)
            .toPromise()
            .then(response => response.json().data as Evento[])
            .catch(this.handleError);
    }

    getEvento(id: number): Promise<Evento> {
        const url = `${this.url}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Evento)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.url}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    setEvento(nurevoEvento: Evento): Promise<Evento> {
        return this.http
            .post(this.url, JSON.stringify(nurevoEvento), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as Evento)
            .catch(this.handleError);
    }

    update(evento: Evento): Promise<Evento> {
        const url = `${this.url}/${evento.nombre}`;
        return this.http
            .put(url, JSON.stringify(evento), { headers: this.headers })
            .toPromise()
            .then(() => evento)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
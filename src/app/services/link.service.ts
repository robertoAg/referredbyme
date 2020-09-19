import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LinkService {
    //private url = 'http://localhost:8080/api/link';
    private url = 'https://api-referredbyme.herokuapp.com/api/link';
    constructor(private  httpClient: HttpClient) { }

    getHeaders(): HttpHeaders {

        const headers = new HttpHeaders();

        headers.set('Content-Type', 'application/json');
        headers.set('Access-Control-Allow-Origin',  '*');
        return headers;
    }

    get(code): any {
        const params = new HttpParams();
        const url = this.url + '/' + code;
        return this.httpClient
            .get(url, {params, headers: this.getHeaders()});
    }

    put(link): any {
        const params = new HttpParams();
        const url = this.url + '/' + link._id;
        return this.httpClient
            .put(url, link);
    }

    post(offers): any {
        const params = new HttpParams();
        const url = this.url;
        return this.httpClient
            .post(url, offers);
    }
}

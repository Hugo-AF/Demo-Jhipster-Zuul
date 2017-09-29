import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Personnes } from './personnes.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PersonnesService {

    private resourceUrl = 'store/api/personnes';
    private resourceSearchUrl = 'store/api/_search/personnes';

    constructor(private http: Http) { }

    create(personnes: Personnes): Observable<Personnes> {
        const copy = this.convert(personnes);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(personnes: Personnes): Observable<Personnes> {
        const copy = this.convert(personnes);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Personnes> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(personnes: Personnes): Personnes {
        const copy: Personnes = Object.assign({}, personnes);
        return copy;
    }
}

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpClientModule  } from '@angular/common/http';

import {map} from 'rxjs/operators'
import { Observable,of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }
  
  addClient(clientData: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/client/', clientData);
   }
}

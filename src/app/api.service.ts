import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpClientModule  } from '@angular/common/http';

import {map} from 'rxjs/operators'
import { Observable,of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>('http://127.0.0.1:8000/api/auth/token/', { username, password })
      .pipe(map(response => {
        // Stockez le token dans le stockage local ou utilisez-le selon vos besoins
        const token = response.access;
        localStorage.setItem('token', token);
        console.log("réponse ::",response.access)
        return response;
      }));


  
  }

  printF(): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<any[]>('http://127.0.0.1:8000/print', { headers });
    }
    else {
      // Retourner un Observable vide ou une valeur par défaut
      return of([]);
  }}
  
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
 }  
}
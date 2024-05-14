import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class CampingService {
 private apiUrl = 'http://127.0.0.1:8000/camping/'; 

 constructor(private http: HttpClient) { }

 getCampings(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
 }
}
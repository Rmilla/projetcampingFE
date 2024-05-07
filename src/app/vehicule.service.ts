import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class VehiculeService {
 private apiUrl = 'http://127.0.0.1:8000/static/vehicle_emissions.json'; 

 constructor(private http: HttpClient) { }

 getVehicules(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
 }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token: string | null = null;
  private headers: HttpHeaders;
  private selectedVehiculeId: string;
  private selectedCampingName: string;
  private handleError(error: HttpErrorResponse) {
    // Log the error or handle it appropriately
    console.error('An error occurred:', error);
    // Return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  constructor(private http: HttpClient) {
    // Initialisez les headers ici si nécessaire, mais sans utiliser localStorage
    this.headers = new HttpHeaders();
    this.selectedVehiculeId = '';
    this.selectedCampingName = '';
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/token/', { username, password })
     .pipe(map(response => {
        // Assurez-vous que le stockage du token se fait uniquement dans un environnement de navigateur
        if (typeof window!== 'undefined') {
          this.token = response.access;
          if (this.token) {
          localStorage.setItem('token', this.token);
          } else {
            // Gérez le cas où this.token est null, par exemple, en supprimant la clé ou en définissant une valeur par défaut
            localStorage.removeItem('token');
          }
        }
        console.log("réponse ::", response.access);
        return response;
      }));
  }

  printF(): Observable<any> {
    // Assurez-vous que le token est récupéré de manière sécurisée pour SSR
    this.token = typeof window!== 'undefined'? localStorage.getItem('token') : null;
    if (this.token) {
      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });
      return this.http.get<any[]>('http://127.0.0.1:8000/print', { headers: this.headers });
    } else {
      // Retourner un Observable vide ou une valeur par défaut
      return of([]);
    }
  }

  isAuthenticated(): boolean {
    // Assurez-vous que la vérification d'authentification est sécurisée pour SSR
    this.token = typeof window!== 'undefined'? localStorage.getItem('token') : null;
    return!!this.token;
  }

  addClient(clientData: any): Observable<any> {
    console.log('Données envoyées:', clientData);
    // Assurez-vous que le token est récupéré de manière sécurisée pour SSR
    this.token = typeof window!== 'undefined'? localStorage.getItem('token') : null;
      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      });
      return this.http.post<any>('http://127.0.0.1:8000/insert_value/', clientData , { headers: this.headers });
      // Gérez le cas où le token n'est pas disponible
  }
  getEmissionsData(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/gen_em_group/').pipe(
      //tap(data => console.log('Données reçues:', data)),
      map(data => {
        const years = Object.keys(data);
        const emissions = years.map(year => data[year]);
        return [{ name: 'Émissions de CO2', series: years.map((year, index) => ({ name: year, value: emissions[index] })) }];
      }),
      catchError(this.handleError)
    );
  }
}
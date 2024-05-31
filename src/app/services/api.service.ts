import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
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
  private handleError(error: HttpErrorResponse) {
    // Log the error or handle it appropriately
    console.error('An error occurred:', error);
    // Return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  constructor(private http: HttpClient) {
    // Initialisez les headers ici si nécessaire, mais sans utiliser localStorage
    this.headers = new HttpHeaders();
    // Récupération du token depuis le localStorage
    this.token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/token/', { username, password })
      .pipe(map(response => {
        // Assurez-vous que le stockage du token se fait uniquement dans un environnement de navigateur
        if (typeof window !== 'undefined') {
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
    this.token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
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
    this.token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return !!this.token;
  }

  addClient(clientData: any): Observable<any> {
    console.log('Données envoyées:', clientData);
    // Assurez-vous que le token est récupéré de manière sécurisée pour SSR
    this.token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>('http://127.0.0.1:8000/insert_value/', clientData, { headers: this.headers });
    // Gérez le cas où le token n'est pas disponible
  }

  getEmissionsData(): Observable<{ year: number; emissions: number }[]> {
    // Récupère le token
    this.token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    // Continue uniquement s'il y a un token
    if (!this.token) {
      console.error('No token available');
      return of([]);
    }

    // Préparez les en-têtes avec le token
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<{ year: number; emissions: number }[]>('http://127.0.0.1:8000/gen_em_group/', { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  getPieData(year: number): Observable<{ emissions: number }[]> {

    // Récupère le token
    this.token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    // Continue uniquement s'il y a un token
    if (!this.token) {
      console.error('No token available');
      return of([]);
    }
    // Préparez les en-têtes avec le token
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    // Utilisez HttpParams pour construire les paramètres de requête
    const body = JSON.stringify({ year: year });

    return this.http.post<{ emissions: number }[]>('http://127.0.0.1:8000/pie_chart/',body ,{ headers: this.headers}).pipe(
      catchError(this.handleError)
    );
  }
  getTransportDistances(): Observable<{vehicle: string; distances: number[]}[]> {
    this.token = typeof window!== 'undefined'? localStorage.getItem('token') : null;
    if (!this.token) {
      console.error('No token available');
      return of([]);
    }
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.get<{vehicle: string; distances: number[]}[]>('http://127.0.0.1:8000/distances_by_mean_of_transport/', { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }
  getTransportEmission(): Observable<{vehicle: string; emissions: number[]}[]> {
    this.token = typeof window!== 'undefined'? localStorage.getItem('token') : null;
    if (!this.token) {
      console.error('No token available');
      return of([]);
    }
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.get<{vehicle: string; emissions: number[]}[]>('http://127.0.0.1:8000/emissions_by_mean_of_transport/', { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

}
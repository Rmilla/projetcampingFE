import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token: string | null = null;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    // Initialisez les headers ici si nécessaire, mais sans utiliser localStorage
    this.headers = new HttpHeaders();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/auth/token/', { username, password })
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
    // Assurez-vous que le token est récupéré de manière sécurisée pour SSR
    this.token = typeof window!== 'undefined'? localStorage.getItem('token') : null;
    if (this.token) {
      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      });
      return this.http.post<any>('http://127.0.0.1:8000/client/', clientData, { headers: this.headers });
    } else {
      // Gérez le cas où le token n'est pas disponible
      return of([]);
    }
  }
}
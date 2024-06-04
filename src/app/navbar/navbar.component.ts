import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public router: Router, private apiService: ApiService) {}
  logout(): void {
    this.apiService.logout();
    // Redirigez l'utilisateur vers la page de connexion ou accueil après la déconnexion
    this.router.navigate(['/']);
  }
}

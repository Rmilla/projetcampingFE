import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from 'express';

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent {
  username!: string;
  password!: string;
  test:any;

  constructor(private apiService: ApiService, private router: Router) { }

  loadTest(){this.apiService.printF().subscribe((data: any) => {
    this.test = data;
    console.log(this.test)})}
    
  
  onSubmit() {
    this.apiService.login(this.username, this.password).subscribe(
      data => {
        // Traitement en cas de succès de la connexion
        console.log('Connecté avec succès', data);
        this.router.navigate(['/stat-general']);
      },
      error => {
        // Traitement en cas d'échec de la connexion
        console.error('Erreur de connexion', error);
      }
 
    );

  }
}

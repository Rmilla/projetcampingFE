import { Component, OnInit} from '@angular/core';
import { CampingService } from '../services/camping.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-ajout-client',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './ajout-client.component.html',
  styleUrl: './ajout-client.component.css'
})
export class AjoutClientComponent implements OnInit {
  campings: any[] = [];
  ville: string = '';
  pays: string = '';
  selectedCampingId: string = '';
  selectedCampingName: string = '';

  constructor(private CampingService: CampingService, private apiService: ApiService) { }
 
  ngOnInit(): void {
     this.CampingService.getCampings().subscribe(data => {
       this.campings = data;
     });
  }

  onCampingSelected(campingId: string): void {
    console.log('Camping sélectionné :', campingId);
    // Effectuez ici l'action souhaitée avec l'ID du camping sélectionné
    const selectedCamping = this.campings.find(camping => camping.id === campingId);
    if (selectedCamping) {
      this.selectedCampingName = selectedCamping.name; // Mettez à jour le nom du camping sélectionné
    }
   }
   onSubmit(): void {
    const clientData = {
      client_city: this.ville, // Assurez-vous que ces variables sont correctement liées à vos champs de formulaire
      client_country: this.pays,
      selectedCampingId: this.selectedCampingId
    };

    this.apiService.addClient(clientData).subscribe(
      response => {
        console.log('Client ajouté avec succès', response);
        // Effectuez ici les actions nécessaires après l'ajout du client, par exemple rediriger l'utilisateur
      },
      error => {
        console.error('Erreur lors de l\'ajout du client', error);
        // Gérez ici les erreurs, par exemple afficher un message d'erreur à l'utilisateur
      }
    );
  }
}


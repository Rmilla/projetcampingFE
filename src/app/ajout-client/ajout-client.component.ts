import { Component, OnInit} from '@angular/core';
import { CampingService } from '../services/camping.service';
import { VehiculeService } from '../vehicule.service';
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
  vehicules: any[] = [];
  selectedCampingName: string = '';
  selectedVehicule: string = '';
  selectedCamping: string = '';
  annee: number = 0;

  constructor(private CampingService: CampingService, private apiService: ApiService, private VehiculeService: VehiculeService) { }
 
  ngOnInit(): void {
     this.CampingService.getCampings().subscribe(data => {
       this.campings = data;
     });
     this.VehiculeService.getVehicules().subscribe(data => {
      this.vehicules = Object.keys(data).map(key => ({ id: key, name: key }));
    });
  }

  onCampingSelected(campingName: string): void {
    console.log('Camping sélectionné :', campingName);
    // Effectuez ici l'action souhaitée avec l'ID du camping sélectionné
    const selectedCamping = this.campings.find(camping => camping.name === campingName);
    if (selectedCamping) {
      this.selectedCamping = campingName; 
    }
  }

  onVehiculeSelected(vehiculeId: string): void {
    console.log('Camping sélectionné :', vehiculeId)
    this.selectedVehicule = vehiculeId;

  }

  onSubmit(): void {
    const clientData = {
      client_city: this.ville, 
      client_country: this.pays,
      selectedCampingName: this.selectedCamping,
      selectedVehiculeId: this.selectedVehicule,
      year: Number(this.annee)
    };
  
    this.apiService.addClient(clientData).subscribe({
      next: (response) => {
        console.log('Client ajouté avec succès', response);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du client', error);
      }
    });
  }
}


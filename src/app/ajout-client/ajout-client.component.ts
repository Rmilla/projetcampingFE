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
  selectedCampingId: string = '';
  selectedCampingName: string = '';
  selectedVehicule: string = '';

  constructor(private CampingService: CampingService, private apiService: ApiService, private VehiculeService: VehiculeService) { }
 
  ngOnInit(): void {
     this.CampingService.getCampings().subscribe(data => {
       this.campings = data;
     });
     this.VehiculeService.getVehicules().subscribe(data => {
      this.vehicules = Object.keys(data).map(key => ({ id: key, name: key }));
    });
  }

  onCampingSelected(campingId: string): void {
    console.log('Camping sélectionné :', campingId);
    // Effectuez ici l'action souhaitée avec l'ID du camping sélectionné
    const selectedCamping = this.campings.find(camping => camping.id === campingId);
    if (selectedCamping) {
      this.selectedCampingName = selectedCamping.name; 
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
      selectedCampingId: this.selectedCampingId,
      selectedVehiculeId: this.selectedVehicule
    };

    this.apiService.addClient(clientData).subscribe(
      response => {
        console.log('Client ajouté avec succès', response);
        
      },
      error => {
        console.error('Erreur lors de l\'ajout du client', error);
        
      }
    );
  }
}


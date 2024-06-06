import { Component, OnInit} from '@angular/core';
import { CampingService } from '../services/camping.service';
import { VehiculeService } from '../services/vehicule.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

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
  annee: Date = new Date();
  villecamping: string = '';
  name: string = '';

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
    // Effectuez ici l'action souhaitée avec le nem du camping sélectionné
    const selectedCamping = this.campings.find(camping => camping.nom_camping === campingName);
    if (selectedCamping) {
      this.selectedCamping = campingName; 
      this.villecamping = selectedCamping.ville_camping
    } else {
      console.error('Camping non trouvé');
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
      client_fullname: this.name,
      vehicle: this.selectedVehicule,
      camping: this.selectedCamping,
      city_camping: this.villecamping,
      date: this.annee
    };
    if (!this.name||!this.annee||!this.selectedCamping||!this.selectedVehicule||!this.ville ||!this.pays ||!this.villecamping) {
      alert('Veuillez remplir tous les champs.');
      return;
    }  
    
    this.apiService.addClient(clientData).subscribe({
      next: (response) => {
        console.log('Client ajouté avec succès', response);
        alert('Client ajouté avec succès')
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du client', error);
        alert('Erreur lors de l\'ajout du client' )
      }
    });
  }
}


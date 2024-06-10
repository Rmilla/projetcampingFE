import { Component, OnInit} from '@angular/core';
import { CampingService } from '../services/camping.service';
import { VehiculeService } from '../services/vehicule.service';
import { NgFor } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms'; 
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
  formGroup: FormGroup;
  selectedCampingIndex: number = -1;

  constructor(private fb: FormBuilder, private CampingService: CampingService, private apiService: ApiService, private VehiculeService: VehiculeService) {
    this.formGroup = this.fb.group({
      name: [''],
      ville: [''],
      pays: [''],
      annee: [''],
      selectedVehicule: [''],
      selectedCamping: [''],
      villecamping: ['']
    });
  }
 
  ngOnInit(): void {
     this.CampingService.getCampings().subscribe(data => {
       this.campings = data;
     });
     this.VehiculeService.getVehicules().subscribe(data => {
      this.vehicules = Object.keys(data).map(key => ({ id: key, name: key }));
    });
    this.formGroup = new FormGroup({
      selectedCamping: new FormControl(''),
      villecamping: new FormControl('')
    });
  }

  onVehiculeSelected(vehiculeId: string): void {
    console.log('Vehicule sélectionné :', vehiculeId)
    this.selectedVehicule = vehiculeId;

  }
  onCampingSelected(index: number): void {
    const camping = this.campings[index];
    if (camping) {
      this.villecamping = camping.ville_camping; // Met à jour la ville du camping
      this.selectedCamping = camping.nom_camping; // Met à jour le nom du camping sélectionné
    }
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


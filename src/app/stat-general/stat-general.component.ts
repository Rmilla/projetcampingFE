import { Component, OnInit  } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CampingService } from '../services/camping.service';

@Component({
  selector: 'app-stat-general',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './stat-general.component.html',
  styleUrl: './stat-general.component.css'
})
export class StatGeneralComponent implements OnInit {
  campings: any[] = [];

  constructor(private CampingService: CampingService) { }
 
  ngOnInit(): void {
     this.CampingService.getCampings().subscribe(data => {
       this.campings = data;
     });
  }

  onCampingSelected(campingId: string): void {
    console.log('Camping sélectionné :', campingId);
    // Effectuez ici l'action souhaitée avec l'ID du camping sélectionné
   }
}

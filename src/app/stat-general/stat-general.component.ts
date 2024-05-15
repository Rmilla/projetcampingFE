import { Component, OnInit  } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CampingService } from '../services/camping.service';
import { ApiService } from '../api.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stat-general',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './stat-general.component.html',
  styleUrl: './stat-general.component.css'
})
export class StatGeneralComponent implements OnInit {
  campings: any[] = [];

  constructor(private apiservice: ApiService) {}
 
  ngOnInit(): void {
    this.apiservice.getEmissionsData().subscribe(data => {
      this.apiservice = data;
    });
  }
}
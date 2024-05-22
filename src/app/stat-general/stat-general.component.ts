import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ApiService } from '../services/api.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stat-general',
  standalone: true,
  imports: [],
  templateUrl: './stat-general.component.html',
  styleUrl: './stat-general.component.css'
})
export class StatGeneralComponent implements OnInit {
  @ViewChild('emissionsChart') emissionsChart!: ElementRef;
  campings: any[] = [];
  title = 'ng-chart';
  chart: any;


  constructor(private apiservice: ApiService) {}
 
  ngOnInit(): void {
    this.apiservice.getEmissionsData().subscribe(data => {
      this.createChart(data);
    });
  }
  createChart(data: any): void {
    this.chart = new Chart(this.emissionsChart.nativeElement, {
      type: 'bar',
      data: {
        labels: Object.keys(data),
        datasets: [{
          label: 'Taux de CO2 par Année',
          data: Object.values(data),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
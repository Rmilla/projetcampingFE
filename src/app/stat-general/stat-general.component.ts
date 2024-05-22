import { Component, OnInit  } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ApiService } from '../services/api.service';
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
  title = 'ng-chart';
  chart: any = [];

  constructor(private apiservice: ApiService) {}
 
  ngOnInit(): void {
    this.apiservice.getEmissionsData().subscribe(data => {
      this.apiservice = data;
    });
    // this.chart = new Chart(ctx, {
    //   type: 'line',
    //   data: {
    //     labels: data.map(item => item.label), // Example assuming each item has a 'label' property
    //     datasets: [{
    //       label: '# Emissions de CO2',
    //       data: data.map(item => item.value), // Example assuming each item has a 'value' property
    //       backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //       borderColor: 'rgba(75, 192, 192, 1)',
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // });
  }

//   updateChartData(data: any[]): void {
//     const myChartElement = document.getElementById('myChart');
//     if (!myChartElement) {
//       console.error('Element with ID "myChart" not found.');
//       return;
//     }

//     const ctx = myChartElement.getContext('2d');
//     if (!ctx) {
//       console.error('Could not get rendering context for "myChart".');
//       return;
//     }
//     this.chart = new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: data.map(item => item.label), // Example assuming each item has a 'label' property
//         datasets: [{
//           label: '# Emissions de CO2',
//           data: data.map(item => item.value), // Example assuming each item has a 'value' property
//           backgroundColor: 'rgba(75, 192, 192, 0.2)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1
//         }]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         }
//       }
//     });

}
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-stat-general',
  standalone: true,
  imports: [NgxChartsModule, CommonModule],
  templateUrl: './stat-general.component.html',
  styleUrl: './stat-general.component.css'
})
export class StatGeneralComponent implements OnInit{
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };  

  public view: [number, number] = [700, 400];
  public xAxisLabel = 'year';
  public yAxisLabel = 'emissions';
  public line: any[] = [];
  public pie: any[] = [];
  public years = Array.from({ length: 12 }, (_, i) => 2023 - i); // Ajustez la plage d'années selon vos besoins


  constructor(private apiservice: ApiService) {}

 
  ngOnInit(): void {
    const year = 2023;
    this.apiservice.getEmissionsData().subscribe(data => {
      this.line = [{
        name: 'Emissions de CO2',
        series: data.map((item) => ({
          name: item.year? item.year.toString() : 'Unknown',
          value: item.emissions
        }))
      }];
    });

    this.apiservice.getPieData(year).subscribe(data => {
      console.log(data);
      // Transformation des données pour correspondre au format attendu par ngx-charts
      this.pie = Object.entries(data).map(([name, value]) => ({
        name: name.replace(/_/g, ' ').toUpperCase(), // Remplace les underscores par des espaces et met en majuscule
        value: Number(value)
      }));
    });
  }
}


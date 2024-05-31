import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// Définition des interfaces pour les données attendues
@Component({
  selector: 'app-stat-general',
  standalone: true,
  imports: [NgxChartsModule, CommonModule, FormsModule],
  templateUrl: './stat-general.component.html',
  styleUrl: './stat-general.component.css'
})
export class StatGeneralComponent implements OnInit{
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };  

  public view: [number, number] = [700, 400];
  public line: any[] = [];
  public pie: any[] = [];
  public transportDistances: any[] = [];
  public transportEmissions: any[] = [];
  public years = Array.from({ length: 12 }, (_, i) => 2023 - i); // Génère les années de 2013 à 2023
  public selectedYear: number = 2023;

  constructor(private apiservice: ApiService) {}

 
  ngOnInit(): void {
    this.updatePieChart();

    this.apiservice.getEmissionsData().subscribe(data => {
      this.line = [{
        name: 'Emissions de CO2',
        series: data.map((item) => ({
          name: item.year? item.year.toString() : 'Unknown',
          value: item.emissions
        }))
      }];
    });

    this.apiservice.getPieData(this.selectedYear).subscribe(data => {
      // Transformation des données pour correspondre au format attendu par ngx-charts
      this.pie = Object.entries(data).map(([name, value]) => ({
        name: name.replace(/_/g, ' ').toUpperCase(), // Remplace les underscores par des espaces et met en majuscule
        value: Number(value)
      }));
    });

    this.apiservice.getTransportDistances().subscribe(data => {
      this.transportDistances = this.transformTransportDistancesData(data);
    });

    this.apiservice.getTransportEmission().subscribe(data => {
      this.transportEmissions = this.transformTransportEmissionData(data);
    });
  }

  transformTransportDistancesData(data: {vehicle: string; distances: number[]}[]): any[] {
    return data.map(vehicleData => ({
      name: vehicleData.vehicle,
      series: vehicleData.distances.map((distance, index) => ({
        name: this.years[index],
        value: distance
      }))
    }));
  }

  transformTransportEmissionData(data: {vehicle: string; emissions: number[]}[]): any[] {
    return data.map(vehicleData => ({
      name: vehicleData.vehicle,
      series: vehicleData.emissions.map((emissions, index) => ({
        name: this.years[index],
        value: emissions
      }))
    }));
  }
  updatePieChart(): void {
    this.apiservice.getPieData(this.selectedYear).subscribe(data => {
      // Transformation des données pour correspondre au format attendu par ngx-charts
      this.pie = Object.entries(data).map(([name, value]) => ({
        name: name.replace(/_/g, ' ').toUpperCase(),
        value: Number(value)
      }));
    });
  }
}

import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
  public years = Array.from({ length: 11 }, (_, i) => 2023 - i); // Génère les années de 2013 à 2023
  public selectedYear: number = 2023;
  public date = new Date("2023-01-10")

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
        name: this.years[this.years.length - 1 - index].toString(),
        value: distance
      }))
    }));
  }

  ngOnChanges(changes: SimpleChanges): void { // Utilisez ngOnChanges au lieu de onChanges
    if (changes.hasOwnProperty('selectedYear')) {
      console.log('ngOnChanges triggered for selectedYear:', changes.hasOwnProperty('selectedYear'));
      this.updatePieChart();
    }
  }

  transformTransportEmissionData(data: {vehicle: string; emissions: number[]}[]): any[] {
    const years = Array.from({ length: 10 }, (_, i) => 2023 - i); // Génère les années de 2023 à 2014
    return data.map(vehicleData => ({
      name: vehicleData.vehicle,
      series: vehicleData.emissions.map((emission, index) => ({
        name: this.years[this.years.length - 1 - index].toString(), // Assurez-vous que l'année correspondante est bien mappée à l'indice
        value: emission
      }))
    }));
  }

  updatePieChart(): void {
    this.apiservice.getPieData(this.selectedYear).subscribe(data => {
      this.pie = Object.entries(data).map(([name, value]) => ({
        name: name.replace(/_/g, ' ').toUpperCase(),
        value: Number(value)
      }));
    });
  }
}

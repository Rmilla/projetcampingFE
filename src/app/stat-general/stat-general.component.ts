import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-stat-general',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './stat-general.component.html',
  styleUrl: './stat-general.component.css'
})
export class StatGeneralComponent implements OnInit{
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };  
  public view: any[] = [700, 400];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showLabels = true;
  public animations = true;
  public xAxisLabel = 'Année';
  public yAxisLabel = 'Émissions de CO2';
  public multi = [];


  constructor(private apiservice: ApiService) {}
 
  ngOnInit(): void {
    this.apiservice.getEmissionsData().subscribe(data => {
      this.multi = data;
    });
  }
}
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router} from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { BanniereComponent } from './banniere/banniere.component';
import { FooterComponent } from './footer/footer.component';
import { AjoutClientComponent } from './ajout-client/ajout-client.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  providers:[ApiService],
  imports: [
    NgFor,
    NgIf, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive, 
    AuthentificationComponent, 
    BanniereComponent, 
    FooterComponent, 
    AjoutClientComponent, 
    NavbarComponent, 
    HttpClientModule, 
    NgxChartsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gestion de camping';
  constructor(public router: Router) {};
}

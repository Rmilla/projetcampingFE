import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive} from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { BanniereComponent } from './banniere/banniere.component';
import { FooterComponent } from './footer/footer.component';
import { AjoutClientComponent } from './ajout-client/ajout-client.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  providers:[ApiService],
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AuthentificationComponent, BanniereComponent, FooterComponent, AjoutClientComponent, AjoutClientComponent, NavbarComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gestion de camping';
}

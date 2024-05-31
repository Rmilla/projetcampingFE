import { Routes } from '@angular/router';
import { AjoutClientComponent } from './ajout-client/ajout-client.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { StatGeneralComponent } from './stat-general/stat-general.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';

export const routes: Routes = [
    { path: '', redirectTo:'/authentification', pathMatch:'full' },
    { path: 'authentification', component: AuthentificationComponent},
    { path: 'ajout-client', component: AjoutClientComponent },
    { path: 'stat-general', component: StatGeneralComponent },
    { path: '**', component: PageNotFoundComponentComponent }
];

import { Routes } from '@angular/router';
import { AjoutClientComponent } from './ajout-client/ajout-client.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { StatCampingComponent } from './stat-camping/stat-camping.component';
import { StatGeneralComponent } from './stat-general/stat-general.component';
import { authguardGuard } from './authguard.guard';

export const routes: Routes = [
    { path: '', redirectTo:'authentification', pathMatch:'full' },
    { path: 'authetification', component: AuthentificationComponent, canActivate: [authguardGuard],},
    { path: 'ajout-client', component: AjoutClientComponent, canActivate: [authguardGuard], },
    { path: 'stat-camping', component: StatCampingComponent, canActivate: [authguardGuard], },
    { path: 'stat-general', component: StatGeneralComponent, canActivate: [authguardGuard], }
    // { path: '**', component: PageNotFoundComponent }
];

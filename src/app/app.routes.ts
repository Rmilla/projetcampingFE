import { Routes } from '@angular/router';
import { AjoutClientComponent } from './ajout-client/ajout-client.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { StatGeneralComponent } from './stat-general/stat-general.component';
import { authguardGuard } from './authguard.guard';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';

export const routes: Routes = [
    { path: '', redirectTo:'/authentification', pathMatch:'full' },
    { path: 'authentification', component: AuthentificationComponent, canActivate: [authguardGuard]},
    { path: 'ajout-client', component: AjoutClientComponent, canActivate: [authguardGuard] },
    { path: 'stat-general', component: StatGeneralComponent, canActivate: [authguardGuard] },
    { path: '**', component: PageNotFoundComponentComponent }
];

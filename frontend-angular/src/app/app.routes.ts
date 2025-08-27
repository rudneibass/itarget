import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'landingpage', 
    pathMatch: 'full' 
  }, 
  {
    path: 'backoffice',
    loadChildren: () =>
      import('./backoffice/backoffice-routing.module').then(m => m.BackofficeModule),
  },
  {
    path: 'landingpage',
    loadChildren: () =>
      import('./landingpage/landingpage-routing.module').then(m => m.LandingpageModule),
  },
];
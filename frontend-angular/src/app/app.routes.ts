import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

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

/*@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
*/
import { Component, signal } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    RouterModule,
  ],
})
export class App {
  protected readonly title = signal('frontend-angular');
}

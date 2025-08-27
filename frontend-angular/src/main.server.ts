import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/ssr/app.config.server';

const bootstrap = () => bootstrapApplication(App, config);

export default bootstrap;

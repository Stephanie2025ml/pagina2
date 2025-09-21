import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { LoginComponent } from './app/login/login'
import { Articulos } from './app/articulos/articulos'
import { provideRouter } from '@angular/router';

// Agrega las rutas aquí
const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'articulos', component: Articulos }
];

// Extender configuración original con rutas
const extendedConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideRouter(routes)
  ]
};

// Usar extendedConfig aquí
bootstrapApplication(App, extendedConfig)
  .catch((err) => console.error(err));

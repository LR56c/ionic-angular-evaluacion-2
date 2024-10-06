import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'quotes',
    loadComponent: () => import('./quotes/quotes.page').then( m => m.QuotesPage)
  },
  {
    path: 'configuration',
    loadComponent: () => import('./configuration/configuration.page').then( m => m.ConfigurationPage)
  },
];

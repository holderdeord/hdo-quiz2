import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { Home } from './home';
import { About } from './about';

const appRoutes: Routes = [
  { path: 'home', component: Home },
  { path: 'about', component: About }
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  // { path: 'about',     name: 'About', loader: () => require('es6-promise!./about')('About') },
  // { path: 'stack/:id', name: 'Stack', loader: () => require('es6-promise!./stack')('Stack') }
];

export const appRoutingProviders: any[] = [
  
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { StackListComponent } from './stack-list';
import { StackComponent } from './stack';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: StackListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'stack/:id', component: StackComponent }
];

export const appRoutingProviders: any[] = [
  
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
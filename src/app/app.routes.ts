import { Routes } from '@angular/router';
import { CarConfigurationComponent } from './components/car-configuration/car-configuration.component';
import { CarSelectionComponent } from './components/car-selection/car-selection.component';
import { CarSummaryComponent } from './components/car-summary/car-summary.component';
import { configurationGuard } from './guards/configuration-guard';
import { summaryGuard } from './guards/summary-guard';

export const routes: Routes = [
  { path: 'carSelection', component: CarSelectionComponent },
  { path: 'carConfiguration', component: CarConfigurationComponent, canActivate: [configurationGuard()] },
  { path: 'carSummary', component: CarSummaryComponent, canActivate: [summaryGuard()] },
  { path: '', redirectTo: '/carSelection', pathMatch: 'full' },
  { path: '**', redirectTo: '/carSelection' }
];

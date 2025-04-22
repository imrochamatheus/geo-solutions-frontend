import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { authRoutes } from './features/auth/auth.routes';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'variables',
        loadComponent: () =>
          import('./features/variables/variables.component').then(
            (m) => m.VariablesComponent
          ),
      },
      {
        path: 'regions',
        loadComponent: () =>
          import('./features/regions/regions.component').then(
            (m) => m.RegionsComponent
          ),
      },
      {
        path: 'configurations',
        loadComponent: () =>
          import('./features/configurations/configurations.component').then(
            (m) => m.ConfigurationsComponent
          ),
      },
      {
        path: 'service-manager',
        loadComponent: () =>
          import('./features/service-manager/service-manager.component').then(
            (m) => m.ServiceManagerComponent
          ),
      },
      {
        path: 'budget',
        loadComponent: () =>
          import('./features/budget/budget.component').then(
            (m) => m.BudgetComponent
          ),
      },
    ],
  },
  {
    path: 'auth',
    title: 'Authentication',
    canActivate: [authGuard],
    children: authRoutes,
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

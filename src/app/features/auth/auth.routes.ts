import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    title: 'Authentication',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'signin',
      },

      {
        path: 'signin',
        title: 'Login',
        loadComponent: () =>
          import('./pages/signin/signin.component').then(
            (m) => m.SigninComponent
          ),
      },
      {
        path: 'signup',
        title: 'Registration',
        loadComponent: () =>
          import('./pages/signin/signin.component').then(
            (m) => m.SigninComponent
          ),
      },
    ],
  },
];

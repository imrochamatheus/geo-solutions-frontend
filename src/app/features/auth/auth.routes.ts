import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    title: 'Authentication',
    children: [
      {
        path: '',
        title: 'Login',
        pathMatch: 'full',
        loadComponent: () =>
          import('./signin/signin.component').then((m) => m.SigninComponent),
      },
      {
        path: 'signup',
        title: 'Cadastro',
        loadComponent: () =>
          import('./signup/signup.component').then((m) => m.SignupComponent),
      },
    ],
  },
];

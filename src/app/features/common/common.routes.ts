import { Routes } from '@angular/router';

export const CommonRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'forbidden',
        loadComponent: () =>
          import('./forbidden/forbidden.component').then(
            (c) => c.ForbiddenComponent
          ),
      },
      {
        path: 'not-found',
        loadComponent: () =>
          import('./not-found/not-found.component').then(
            (c) => c.NotFoundComponent
          ),
      },
    ],
  },
];

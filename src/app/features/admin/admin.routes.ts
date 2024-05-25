import { Routes } from '@angular/router';

export const AdminRoutes: Routes = [
  {
    path: 'products',
    children: [
      {
        path: 'create-or-update',
        loadComponent: () =>
          import('./products/create-or-update/create-or-update.component').then(
            (c) => c.CreateOrUpdateComponent
          ),
      },
      {
        path: 'create-or-update/:id',
        loadComponent: () =>
          import('./products/create-or-update/create-or-update.component').then(
            (c) => c.CreateOrUpdateComponent
          ),
      },
      {
        path: 'list',
        loadComponent: () =>
          import('./products/list/list.component').then((c) => c.ListComponent),
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

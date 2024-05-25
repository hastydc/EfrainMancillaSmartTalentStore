import { Routes } from '@angular/router';

export const SiteRoutes: Routes = [
  {
    path: 'products',
    children: [
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
  {
    path: 'cart',
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./cart/list/list.component').then((c) => c.ListComponent),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./cart/checkout/checkout.component').then(
            (c) => c.CheckoutComponent
          ),
      },
      {
        path: 'thanks',
        loadComponent: () =>
          import('./cart/thanks/thanks.component').then(
            (c) => c.ThanksComponent
          ),
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

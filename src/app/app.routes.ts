import { Routes } from '@angular/router';
import { LayoutAdminComponent } from './layout/layout-admin/layout-admin.component';
import { LayoutSiteComponent } from './layout/layout-site/layout-site.component';
import { RoleGuard } from './shared/guards/role/role.guard';
import { UserRole } from './shared/models/enums/userRole.enum';
import { LayoutCommonComponent } from './layout/layout-common/layout-common.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: LayoutAdminComponent,
    canActivate: [RoleGuard([UserRole.ADMIN])],
    loadChildren: () =>
      import('./features/admin/admin.routes').then((r) => r.AdminRoutes),
  },
  {
    path: 'site',
    component: LayoutSiteComponent,
    canActivate: [RoleGuard([UserRole.CUSTOMER])],
    loadChildren: () =>
      import('./features/site/site.routes').then((r) => r.SiteRoutes),
  },
  {
    path: 'session',
    loadChildren: () =>
      import('./features/session/session.routes').then((r) => r.SessionRoutes),
  },
  {
    path: 'common',
    component: LayoutCommonComponent,
    loadChildren: () =>
      import('./features/common/common.routes').then((r) => r.CommonRoutes),
  },
  {
    path: '',
    redirectTo: '/session/sign-in',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/common/not-found',
    pathMatch: 'full',
  },
];

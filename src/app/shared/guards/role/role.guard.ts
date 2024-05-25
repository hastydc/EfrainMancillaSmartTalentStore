import { Router } from '@angular/router';
import { DbService } from '../../services/db/db.service';
import { inject } from '@angular/core';
import { DBKey } from '../../models/enums/dbKey.enum';
import { UserData } from '../../models/interfaces/sessionForm.interface';

export const RoleGuard = (roles: string[]) => (): boolean => {
  const dbService: DbService = inject(DbService);

  const user: UserData = (dbService.get(DBKey.CURRENT_AUTH) as UserData) ?? {
    role: '',
  };

  const valid = roles.includes(user.role?.toString() ?? '');

  if (!valid) {
    const router: Router = inject(Router);
    router.navigate(['/common/forbidden']);
  }

  return valid;
};

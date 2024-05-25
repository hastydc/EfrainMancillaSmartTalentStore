import { Injectable, inject } from '@angular/core';
import { DbService } from '../db/db.service';
import { UserData } from '../../models/interfaces/sessionForm.interface';
import { Observable, of } from 'rxjs';
import { DBKey } from '../../models/enums/dbKey.enum';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly dbService: DbService = inject(DbService);

  getCurrentUser(): Observable<UserData> {
    const user: UserData = this.dbService.get(
      DBKey.CURRENT_AUTH
    ) as unknown as UserData;

    return of(user);
  }
}

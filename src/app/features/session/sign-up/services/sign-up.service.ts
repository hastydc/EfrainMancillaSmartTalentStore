import { Injectable, inject } from '@angular/core';
import { DbService } from '../../../../shared/services/db/db.service';
import { DBKey } from '../../../../shared/models/enums/dbKey.enum';
import { Observable, of, throwError } from 'rxjs';
import { UserData } from '../../../../shared/models/interfaces/sessionForm.interface';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private readonly dbService: DbService = inject(DbService);

  constructor() {}

  createUser(user: UserData, update: boolean = false): Observable<boolean> {
    const users: UserData[] = (this.dbService.get(DBKey.USERS) as []) ?? [];

    const userIndex: number = users.findIndex(
      ({ email }: UserData) => email === user.email
    );

    if (userIndex >= 0 && !update) {
      return throwError(() => new Error('emailIsNotAvailable'));
    }

    if (userIndex >= 0 && update) {
      users[userIndex] = user;
    } else {
      users.push(user);
    }

    this.dbService.set(DBKey.USERS, users);

    return of(true);
  }
}

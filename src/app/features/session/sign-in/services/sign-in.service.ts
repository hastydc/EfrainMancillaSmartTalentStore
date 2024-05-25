import { Injectable, inject } from '@angular/core';
import { DbService } from '../../../../shared/services/db/db.service';
import { Observable, of, throwError } from 'rxjs';
import { DBKey } from '../../../../shared/models/enums/dbKey.enum';
import { UserData } from '../../../../shared/models/interfaces/sessionForm.interface';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private readonly dbService: DbService = inject(DbService);

  constructor() {}

  getUser({ email, password }: UserData): Observable<UserData> {
    const users: UserData[] = (this.dbService.get(DBKey.USERS) as []) ?? [];

    const user: UserData =
      users.find(
        (user: UserData) => user.email === email && user.password === password
      ) ?? ({} as UserData);

    const valid = email === user?.email && password === user?.password;

    if (!valid) {
      return throwError(() => new Error('credentialsAreInvalid'));
    }

    this.dbService.set(DBKey.CURRENT_AUTH, user);

    return of(user);
  }

  signOut(): void {
    this.dbService.delete(DBKey.CURRENT_AUTH);
  }
}

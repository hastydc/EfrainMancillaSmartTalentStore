import { Injectable, inject } from '@angular/core';
import { CryptoService } from '../crypto/crypto.service';
import { DBKey } from '../../models/enums/dbKey.enum';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private readonly cryptoService: CryptoService = inject(CryptoService);

  get(dbKey: DBKey): [] | string | {} | null {
    let value = localStorage.getItem(dbKey) ?? '';
    value = this.cryptoService.decrypt(value);

    if (!value) return null;

    return JSON.parse(value);
  }

  set(dbKey: DBKey, value: any): void {
    const encValue = this.cryptoService.encrypt(JSON.stringify(value));

    localStorage.setItem(dbKey, encValue);
  }

  delete(dbKey: DBKey): void {
    localStorage.removeItem(dbKey);
  }

  delay(ms = 0): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

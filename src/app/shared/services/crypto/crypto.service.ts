import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor() {}

  encrypt(value: any): string {
    return AES.encrypt(value, environment.cryptoKey).toString();
  }

  decrypt(value: any): any {
    return AES.decrypt(value, environment.cryptoKey).toString(enc.Utf8);
  }
}

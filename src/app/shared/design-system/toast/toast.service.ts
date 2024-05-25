import { Injectable, signal } from '@angular/core';
import { ToastConfig } from '../../models/interfaces/toastConfig.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private show = signal<ToastConfig>({ show: false });

  setConfig(value: ToastConfig): void {
    this.show.update(() => value);
  }

  getConfig(): ToastConfig {
    return this.show();
  }
}

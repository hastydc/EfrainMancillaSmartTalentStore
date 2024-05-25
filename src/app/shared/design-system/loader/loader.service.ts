import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private visible = signal<boolean>(false);

  setVisible(value: boolean): void {
    this.visible.update(() => value);
  }

  getVisible(): boolean {
    return this.visible();
  }
}

import {
  CdkConnectedOverlay,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, effect, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ToastService } from './toast.service';
import { ToastConfig } from '../../models/interfaces/toastConfig.interface';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [TranslateModule, PortalModule, CdkConnectedOverlay, CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  @ViewChild(CdkPortal) portal!: CdkPortal;

  private readonly overlay: Overlay = inject(Overlay);
  private readonly toastService: ToastService = inject(ToastService);
  overlayRef!: OverlayRef;

  config: ToastConfig = { show: false, text: '' };

  constructor() {
    effect(() => {
      this.config = this.toastService.getConfig();

      if (this.config.show) this.show();
    });
  }

  getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      hasBackdrop: false,
      maxWidth: '300px',
      positionStrategy: this.overlay
        .position()
        .global()
        .top('112px')
        .right('16px'),
    });
  }

  show(): void {
    if (this.overlayRef) this.overlayRef.detach();

    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.portal);

    setTimeout(() => {
      this.close();
    }, 7000);
  }

  close(): void {
    this.overlayRef?.dispose();
    this.toastService.setConfig({ show: false });
  }
}

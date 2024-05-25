import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../shared/design-system/button/button.component';
import { Router, RouterModule } from '@angular/router';
import { SectionNameComponent } from '../../../../shared/design-system/section-name/section-name.component';

@Component({
  selector: 'app-thanks',
  standalone: true,
  imports: [
    TranslateModule,
    ButtonComponent,
    RouterModule,
    SectionNameComponent,
  ],
  templateUrl: './thanks.component.html',
  styleUrl: './thanks.component.scss',
})
export class ThanksComponent {
  private readonly router: Router = inject(Router);
}

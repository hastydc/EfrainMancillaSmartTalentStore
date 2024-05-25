import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../shared/design-system/button/button.component';
import { SectionNameComponent } from '../../../shared/design-system/section-name/section-name.component';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [
    TranslateModule,
    ButtonComponent,
    SectionNameComponent,
    RouterModule,
  ],
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.scss',
})
export class ForbiddenComponent {}

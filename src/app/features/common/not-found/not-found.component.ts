import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../shared/design-system/button/button.component';
import { SectionNameComponent } from '../../../shared/design-system/section-name/section-name.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    TranslateModule,
    ButtonComponent,
    SectionNameComponent,
    RouterModule,
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}

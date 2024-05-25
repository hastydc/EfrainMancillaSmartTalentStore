import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-section-name',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './section-name.component.html',
  styleUrl: './section-name.component.scss',
})
export class SectionNameComponent {
  @Input() url: string = '';
  @Input() text: string = '';
}

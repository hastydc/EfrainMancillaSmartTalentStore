import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectOption } from '../../models/interfaces/selectOption.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  selector: 'app-input-select',
  standalone: true,
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss',
})
export class InputSelectComponent {
  @Input() key: string = '';
  @Input() form!: FormGroup;
  @Input() options: SelectOption[] = [];
}

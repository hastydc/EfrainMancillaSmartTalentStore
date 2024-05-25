import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectOption } from '../../models/interfaces/selectOption.interface';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
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

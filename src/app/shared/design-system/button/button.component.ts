import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() label: string = '';

  @Input() mask: boolean = false;

  @Input() primary: boolean = true;

  @Input() disabled: boolean = false;

  @Output() actionEvent: EventEmitter<void> = new EventEmitter<void>();

  size: 'small' | 'big' = 'small';

  action(): void {
    if (this.disabled) return;

    this.actionEvent.emit();
  }
}

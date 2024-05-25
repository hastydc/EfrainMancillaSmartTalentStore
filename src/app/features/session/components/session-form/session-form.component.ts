import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SessionFormKey } from '../../../../shared/models/enums/sessionFormKey.enum';
import { ButtonComponent } from '../../../../shared/design-system/button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../../shared/design-system/input/input.component';
import { InputSelectComponent } from '../../../../shared/design-system/input-select/input-select.component';
import { UserRole } from '../../../../shared/models/enums/userRole.enum';
import {
  UserData,
  SessionForm,
} from '../../../../shared/models/interfaces/sessionForm.interface';

@Component({
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    TranslateModule,
    CommonModule,
    InputComponent,
    InputSelectComponent,
  ],
  selector: 'app-session-form',
  standalone: true,
  templateUrl: './session-form.component.html',
  styleUrl: './session-form.component.scss',
})
export class SessionFormComponent implements OnInit {
  @Output() btnAction: EventEmitter<UserData> = new EventEmitter<UserData>();

  @Input() btnLabel: string = '';

  @Input() signUp: boolean = false;

  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  form!: FormGroup;
  formKey = SessionFormKey;
  role = UserRole;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    let controls: SessionForm = {
      [SessionFormKey.EMAIL]: ['', [Validators.required, Validators.email]],
      [SessionFormKey.PASSWORD]: ['', [Validators.required]],
    };

    if (this.signUp) {
      controls = {
        ...controls,
        [SessionFormKey.ROLE]: ['', [Validators.required]],
      };
    }

    this.form = this.formBuilder.group<SessionForm>(controls);
  }

  action(): void {
    this.btnAction.emit(this.form.getRawValue());
  }
}

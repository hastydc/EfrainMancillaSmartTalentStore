import { AbstractControl, ValidationErrors } from '@angular/forms';
import { SessionFormKey } from '../enums/sessionFormKey.enum';

export interface SessionForm {
  [SessionFormKey.EMAIL]: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  [SessionFormKey.PASSWORD]: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  [SessionFormKey.ROLE]?: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
}

export interface UserData {
  [SessionFormKey.EMAIL]: string;
  [SessionFormKey.PASSWORD]: string;
  [SessionFormKey.ROLE]?: string;
}

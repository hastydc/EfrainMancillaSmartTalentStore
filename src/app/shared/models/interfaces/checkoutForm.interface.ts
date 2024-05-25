import { AbstractControl, ValidationErrors } from '@angular/forms';
import { CheckoutFormKey } from '../enums/checkoutFormKey.enum';

export interface CheckoutForm {
  [CheckoutFormKey.FULL_NAME]?: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  [CheckoutFormKey.ADDRESS]?: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  [CheckoutFormKey.PHONE]?: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  [CheckoutFormKey.EMAIL]?: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  [CheckoutFormKey.PAYMENT_TYPE]?: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
}

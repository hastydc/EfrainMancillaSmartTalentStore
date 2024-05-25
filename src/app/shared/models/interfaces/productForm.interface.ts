import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ProductFormKey } from '../enums/productFormKey.enum';

export interface ProductForm {
  [ProductFormKey.ID]?: (
    | number
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  [ProductFormKey.NAME]: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  [ProductFormKey.DESCRIPTION]: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  [ProductFormKey.PRICE]?: (
    | number
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  [ProductFormKey.STOCK]?: (
    | number
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
}

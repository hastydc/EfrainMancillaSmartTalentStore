import { ProductFormKey } from '../enums/productFormKey.enum';

export interface ProductData {
  [ProductFormKey.ID]: number;
  [ProductFormKey.NAME]: string;
  [ProductFormKey.DESCRIPTION]: string;
  [ProductFormKey.PRICE]: number;
  [ProductFormKey.STOCK]: number;
}

import { ProductData } from './productData.interface';

export interface ProductCartData extends ProductData {
  amount: number;
}

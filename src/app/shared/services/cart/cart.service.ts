import { Injectable, inject, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DBKey } from '../../models/enums/dbKey.enum';
import { DbService } from '../db/db.service';
import { ProductCartData } from '../../models/interfaces/productCartData.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly dbService: DbService = inject(DbService);
  private badge = signal<number>(0);

  setBadge(value: number): void {
    this.badge.update(() => value);
  }

  getBadge(): number {
    return this.badge();
  }

  getProductsCart(): Observable<ProductCartData[]> {
    const products: ProductCartData[] =
      (this.dbService.get(DBKey.PRODUCTS_CART) as []) ?? [];

    return of(products);
  }

  addToCart(payload: ProductCartData): Observable<boolean> {
    const products: ProductCartData[] =
      (this.dbService.get(DBKey.PRODUCTS_CART) as []) ?? [];

    let productIndex: number | undefined = products.findIndex(
      ({ id }) => id === payload.id
    );

    if (productIndex < 0) {
      products.push(payload);
    } else {
      products[productIndex] = payload;
    }

    this.dbService.set(DBKey.PRODUCTS_CART, products);
    this.setBadge(products.length);

    return of(true);
  }

  removeFromCart(productId: number): Observable<boolean> {
    const products: ProductCartData[] =
      (this.dbService.get(DBKey.PRODUCTS_CART) as []) ?? [];

    let productIndex: number | undefined = products.findIndex(
      ({ id }) => id === productId
    );

    products.splice(productIndex, 1);

    this.dbService.set(DBKey.PRODUCTS_CART, products);
    this.setBadge(products.length);

    return of(true);
  }

  clearCart(): Observable<boolean> {
    this.dbService.delete(DBKey.PRODUCTS_CART);
    this.setBadge(0);

    return of(true);
  }

  checkBadge(): void {
    const products: ProductCartData[] =
      (this.dbService.get(DBKey.PRODUCTS_CART) as []) ?? [];
    this.setBadge(products.length);
  }
}

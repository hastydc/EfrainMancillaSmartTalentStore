import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ProductData } from '../../models/interfaces/productData.interface';
import { DBKey } from '../../models/enums/dbKey.enum';
import { DbService } from '../db/db.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly dbService: DbService = inject(DbService);

  createProduct(payload: ProductData): Observable<ProductData> {
    const products: ProductData[] =
      (this.dbService.get(DBKey.PRODUCTS) as []) ?? [];

    let product: ProductData | undefined = products.find(
      ({ name }) => name === payload.name
    );

    if (product) {
      return throwError(() => new Error('productNameIsNotAvailable'));
    }

    product = { ...payload, id: products.length + 1 };
    products.push(product);

    this.dbService.set(DBKey.PRODUCTS, products);

    return of(product);
  }

  updateProduct(payload: ProductData): Observable<ProductData> {
    const products: ProductData[] =
      (this.dbService.get(DBKey.PRODUCTS) as []) ?? [];

    let productIndex: number | undefined = products.findIndex(
      ({ id }) => id === payload.id
    );

    if (productIndex < 0) {
      return throwError(() => new Error('productNotFound'));
    }

    products[productIndex] = payload;

    this.dbService.set(DBKey.PRODUCTS, products);

    return of(products[productIndex]);
  }

  deleteProduct(sourceId: number): Observable<boolean> {
    const products: ProductData[] =
      (this.dbService.get(DBKey.PRODUCTS) as []) ?? [];

    let productIndex: number | undefined = products.findIndex(
      ({ id }) => id === sourceId
    );

    if (productIndex < 0) {
      return throwError(() => new Error('productNotFound'));
    }

    products.splice(productIndex, 1);

    this.dbService.set(DBKey.PRODUCTS, products);

    return of(true);
  }

  getProduct(sourceId: number): Observable<ProductData> {
    const products: ProductData[] =
      (this.dbService.get(DBKey.PRODUCTS) as []) ?? [];

    let product: ProductData | undefined = products.find(
      ({ id }) => id === sourceId
    );

    if (!product) {
      return throwError(() => new Error('productNotFound'));
    }

    return of(product);
  }

  getProducts(): Observable<ProductData[]> {
    const products: ProductData[] =
      (this.dbService.get(DBKey.PRODUCTS) as []) ?? [];

    if (!products.length) {
      return throwError(() => new Error('productsNotFound'));
    }

    return of(products);
  }
}

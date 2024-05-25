import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { DbService } from '../db/db.service';
import { DBKey } from '../../models/enums/dbKey.enum';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    TestBed.inject(DbService).delete(DBKey.PRODUCTS);
    expect(service).toBeTruthy();
  });

  it('createProduct', () => {
    const spy = spyOn(service, 'createProduct').and.callThrough();
    const product = {
      id: 1,
      name: new Date().getTime().toString(),
      description: '3',
      price: 1,
      stock: 2,
    };

    service.createProduct(product).subscribe((r) => {
      expect(r.description).toEqual(product.description);
    });

    expect(spy).toHaveBeenCalledWith(product);
  });
});

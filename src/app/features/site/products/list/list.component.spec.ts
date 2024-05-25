import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';

import { ListComponent } from './list.component';
import { TranslateModuleMock } from '../../../../shared/tests/utils.mock';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ProductsService } from '../../../../shared/services/products/products.service';
import { ProductData } from '../../../../shared/models/interfaces/productData.interface';
import { CartService } from '../../../../shared/services/cart/cart.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent, TranslateModuleMock],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getProducts', fakeAsync(() => {
    TestBed.inject(ProductsService).getProducts = jasmine
      .createSpy()
      .and.returnValue(of([{ id: 1, amount: 2 }]));

    component.getProducts();

    tick(5000);
    flush();

    expect(component.baseProducts.length).toEqual(1);
  }));

  it('getProducts error', fakeAsync(() => {
    component.baseProducts = [];
    fixture.detectChanges();

    TestBed.inject(ProductsService).getProducts = jasmine
      .createSpy()
      .and.returnValue(throwError(() => new Error('')));

    component.getProducts();

    tick(5000);
    flush();

    expect(component.baseProducts.length).toEqual(0);
  }));

  it('deleteProduct', () => {
    const spy = spyOn(component, 'getProducts').and.callThrough();
    TestBed.inject(ProductsService).deleteProduct = jasmine
      .createSpy()
      .and.returnValue(of(true));

    component.deleteProduct(1);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('deleteProduct error', () => {
    const spy = spyOn(component, 'getProducts').and.callThrough();
    TestBed.inject(ProductsService).deleteProduct = jasmine
      .createSpy()
      .and.returnValue(throwError(() => new Error('')));

    component.deleteProduct(1);

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('checkStock', fakeAsync(() => {
    component.productStock = { '1': 3 };
    fixture.detectChanges();

    component.checkStock({ id: 1, stock: 2 } as ProductData);

    tick(2000);
    flush();

    expect(component.productStock['1']).toEqual(2);
  }));

  it('addToCart', () => {
    TestBed.inject(CartService).addToCart = jasmine
      .createSpy()
      .and.returnValue(of({}));

    component.addToCart({ id: 1 } as ProductData);

    expect(component.productStock[1]).toEqual(0);
  });

  it('filterProductsBySearch', () => {
    component.search = '2';
    component.baseProducts = [{ name: '1', description: '2' } as ProductData];
    fixture.detectChanges();
    const spy = spyOn(component, 'filterProductsBySearch').and.callThrough();

    component.filterProductsBySearch();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

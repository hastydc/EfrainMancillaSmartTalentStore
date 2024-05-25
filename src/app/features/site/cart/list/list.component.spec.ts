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
import { CartService } from '../../../../shared/services/cart/cart.service';
import { of, throwError } from 'rxjs';
import { ProductData } from '../../../../shared/models/interfaces/productData.interface';

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

  it('getProducts', fakeAsync(() => {
    TestBed.inject(CartService).getProductsCart = jasmine
      .createSpy()
      .and.returnValue(of([{ id: 1, amount: 2 }]));

    component.getProducts();

    tick(5000);
    flush();

    expect(component.products.length).toEqual(1);
  }));

  it('getProducts error', fakeAsync(() => {
    component.products = [];
    fixture.detectChanges();

    TestBed.inject(CartService).getProductsCart = jasmine
      .createSpy()
      .and.returnValue(throwError(() => new Error('')));

    component.getProducts();

    tick(5000);
    flush();

    expect(component.products.length).toEqual(0);
  }));

  it('deleteProduct', () => {
    const spy = spyOn(component, 'getProducts').and.callThrough();
    TestBed.inject(CartService).removeFromCart = jasmine
      .createSpy()
      .and.returnValue(of(true));

    component.deleteProduct(1);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('deleteProduct error', () => {
    const spy = spyOn(component, 'getProducts').and.callThrough();
    TestBed.inject(CartService).removeFromCart = jasmine
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
    const spy = spyOn(component, 'getProducts').and.callThrough();
    TestBed.inject(CartService).addToCart = jasmine
      .createSpy()
      .and.returnValue(of(true));

    component.addToCart({ id: 1 } as ProductData);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

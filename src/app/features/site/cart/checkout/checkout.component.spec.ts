import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { TranslateModuleMock } from '../../../../shared/tests/utils.mock';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartService } from '../../../../shared/services/cart/cart.service';
import { of } from 'rxjs';
import { UserData } from '../../../../shared/models/interfaces/sessionForm.interface';
import { ProductCartData } from '../../../../shared/models/interfaces/productCartData.interface';
import { ProductsService } from '../../../../shared/services/products/products.service';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutComponent, TranslateModuleMock],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getProducts', fakeAsync(() => {
    TestBed.inject(CartService).getProductsCart = jasmine
      .createSpy()
      .and.returnValue(of([{ id: 1, price: 2, amount: 1 }]));

    component.getProducts();

    tick(5000);
    flush();

    expect(component.total).toEqual(2);
  }));

  it('initForm', () => {
    component.user = { email: '1' } as UserData;
    fixture.detectChanges();
    component.initForm();

    expect(component.form).toBeDefined();
  });

  it('buy', fakeAsync(() => {
    const spy = spyOn(
      (component as any).toastService,
      'setConfig'
    ).and.callThrough();
    TestBed.inject(ProductsService).updateProduct = jasmine
      .createSpy()
      .and.returnValue(of());
    TestBed.inject(Router).navigate = jasmine
      .createSpy()
      .and.returnValue(of(true));
    component.products = [{ id: 1, amount: 1, stock: 1 }] as ProductCartData[];
    fixture.detectChanges();

    component.buy();

    tick(5000);
    flush();

    expect(spy).toHaveBeenCalledTimes(1);
  }));
});

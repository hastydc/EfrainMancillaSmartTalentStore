import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';

import { ListComponent } from './list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModuleMock } from '../../../../shared/tests/utils.mock';
import { of, throwError } from 'rxjs';
import { ProductsService } from '../../../../shared/services/products/products.service';

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
    TestBed.inject(ProductsService).getProducts = jasmine
      .createSpy()
      .and.returnValue(of([{ id: 1 }]));

    component.getProducts();

    tick(5000);
    flush();

    expect(component.products.length).toEqual(1);
  }));

  it('getProducts Error', fakeAsync(() => {
    component.products = [];
    TestBed.inject(ProductsService).getProducts = jasmine
      .createSpy()
      .and.returnValue(throwError(() => new Error('')));

    component.getProducts();

    tick(5000);
    flush();

    expect(component.products.length).toEqual(0);
  }));

  it('goToEdit', () => {
    const spy = spyOn(component, 'goToEdit').and.callThrough();
    TestBed.inject(Router).navigate = jasmine
      .createSpy()
      .and.returnValue(of(true));

    component.goToEdit(1);

    expect(spy).toHaveBeenCalledWith(1);
  });

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
});

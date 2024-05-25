import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';

import { CreateOrUpdateComponent } from './create-or-update.component';
import { ActivatedRoute } from '@angular/router';
import { TranslateModuleMock } from '../../../../shared/tests/utils.mock';
import { of, throwError } from 'rxjs';
import { DbService } from '../../../../shared/services/db/db.service';
import { DBKey } from '../../../../shared/models/enums/dbKey.enum';
import { ProductData } from '../../../../shared/models/interfaces/productData.interface';
import { ProductsService } from '../../../../shared/services/products/products.service';

describe('CreateOrUpdateComponent', () => {
  let component: CreateOrUpdateComponent;
  let fixture: ComponentFixture<CreateOrUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrUpdateComponent, TranslateModuleMock],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    (component as any).activatedRoute = { snapshot: { params: { id: 1 } } };
    fixture.detectChanges();
    component.ngOnInit();

    expect(component.label).toEqual('edit');
  });

  it('getProduct', fakeAsync(() => {
    const spy = spyOn(component, 'initForm').and.callThrough();
    TestBed.inject(ProductsService).getProduct = jasmine
      .createSpy()
      .and.returnValue(of({ id: 1 }));

    component.id = 1;
    component.getProduct();

    tick(5000);
    flush();

    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('getProduct error', fakeAsync(() => {
    const spy = spyOn(component, 'initForm').and.callThrough();
    TestBed.inject(ProductsService).getProduct = jasmine
      .createSpy()
      .and.returnValue(throwError(() => new Error('')));

    component.id = 1;
    component.getProduct();

    tick(5000);
    flush();

    expect(spy).toHaveBeenCalledTimes(0);
  }));

  it('save create', fakeAsync(() => {
    component.id = 0;
    const spy = spyOn(component, 'getProduct').and.callThrough();
    TestBed.inject(ProductsService).createProduct = jasmine
      .createSpy()
      .and.returnValue(of({ id: 1 }));

    component.save();

    tick(5000);
    flush();

    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('save error', fakeAsync(() => {
    component.id = 0;
    const spy = spyOn(component, 'getProduct').and.callThrough();
    TestBed.inject(ProductsService).createProduct = jasmine
      .createSpy()
      .and.returnValue(throwError(() => new Error('')));

    component.save();

    tick(5000);
    flush();

    expect(spy).toHaveBeenCalledTimes(0);
  }));

  it('save edit', fakeAsync(() => {
    component.id = 1;
    const spy = spyOn(component, 'getProduct').and.callThrough();
    TestBed.inject(ProductsService).updateProduct = jasmine
      .createSpy()
      .and.returnValue(of({ id: 1 }));

    component.save();

    tick(5000);
    flush();

    expect(spy).toHaveBeenCalledTimes(1);
  }));
});

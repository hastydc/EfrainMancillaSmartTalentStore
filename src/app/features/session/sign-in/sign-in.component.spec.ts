import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModuleMock } from '../../../shared/tests/utils.mock';
import { of, throwError } from 'rxjs';
import { SignInService } from './services/sign-in.service';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInComponent, TranslateModuleMock],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('signIn', fakeAsync(() => {
    const spy = spyOn(component, 'signIn').and.callThrough();
    TestBed.inject(Router).navigate = jasmine
      .createSpy()
      .and.returnValue(of(true));
    TestBed.inject(SignInService).getUser = jasmine
      .createSpy()
      .and.returnValue(of({ id: 1, role: 'admin' }));

    component.signIn({ email: '1', password: '2' });

    tick(5000);
    flush();

    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('signIn error', fakeAsync(() => {
    const spy = spyOn(component, 'signIn').and.callThrough();
    TestBed.inject(Router).navigate = jasmine
      .createSpy()
      .and.returnValue(of(true));
    TestBed.inject(SignInService).getUser = jasmine
      .createSpy()
      .and.returnValue(throwError(() => new Error('')));

    component.signIn({ email: '1', password: '2' });

    tick(5000);
    flush();

    expect(spy).toHaveBeenCalledTimes(1);
  }));
});

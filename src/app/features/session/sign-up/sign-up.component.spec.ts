import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModuleMock } from '../../../shared/tests/utils.mock';
import { of, throwError } from 'rxjs';
import { SignInService } from '../sign-in/services/sign-in.service';
import { SignUpService } from './services/sign-up.service';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent, TranslateModuleMock],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('signUp', fakeAsync(() => {
    const spy = spyOn(component, 'signUp').and.callThrough();
    TestBed.inject(Router).navigate = jasmine
      .createSpy()
      .and.returnValue(of(true));
    TestBed.inject(SignUpService).createUser = jasmine
      .createSpy()
      .and.returnValue(of({ id: 1, role: 'admin' }));

    component.signUp({ email: '1', password: '2' });

    tick(5000);
    flush();

    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('signIn error', fakeAsync(() => {
    const spy = spyOn(component, 'signUp').and.callThrough();
    TestBed.inject(Router).navigate = jasmine
      .createSpy()
      .and.returnValue(of(true));
    TestBed.inject(SignInService).getUser = jasmine
      .createSpy()
      .and.returnValue(throwError(() => new Error('')));

    component.signUp({ email: '1', password: '2' });

    tick(5000);
    flush();

    expect(spy).toHaveBeenCalledTimes(1);
  }));
});

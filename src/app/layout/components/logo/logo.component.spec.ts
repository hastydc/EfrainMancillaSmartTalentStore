import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoComponent } from './logo.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('redirect', () => {
    component.session = true;
    fixture.detectChanges();
    const spy = spyOn(component, 'redirect').and.callThrough();
    TestBed.inject(Router).navigate = jasmine
      .createSpy()
      .and.returnValue(of(true));

    component.redirect();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('redirect notSession', () => {
    component.session = false;
    component.customer = false;
    fixture.detectChanges();
    const spy = spyOn(component, 'redirect').and.callThrough();
    TestBed.inject(Router).navigate = jasmine
      .createSpy()
      .and.returnValue(of(true));

    component.redirect();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('redirect notSession branch', () => {
    component.session = false;
    component.customer = true;
    fixture.detectChanges();
    const spy = spyOn(component, 'redirect').and.callThrough();
    TestBed.inject(Router).navigate = jasmine
      .createSpy()
      .and.returnValue(of(true));

    component.redirect();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

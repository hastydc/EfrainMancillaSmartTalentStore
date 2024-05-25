import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('signOut', () => {
    const spy = spyOn(component, 'signOut').and.callThrough();
    TestBed.inject(Router).navigate = jasmine
      .createSpy()
      .and.returnValue(of(true));

    component.signOut();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

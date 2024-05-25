import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { TranslateModuleMock } from '../../tests/utils.mock';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent, TranslateModuleMock],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('action', () => {
    const spy = spyOn(component.actionEvent, 'emit').and.callThrough();
    component.disabled = false;
    fixture.detectChanges();

    component.action();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('action disabled', () => {
    const spy = spyOn(component.actionEvent, 'emit').and.callThrough();
    component.disabled = true;
    fixture.detectChanges();

    component.action();

    expect(spy).toHaveBeenCalledTimes(0);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSelectComponent } from './input-select.component';
import { TranslateModuleMock } from '../../tests/utils.mock';
import { ActivatedRoute } from '@angular/router';

describe('InputSelectComponent', () => {
  let component: InputSelectComponent;
  let fixture: ComponentFixture<InputSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSelectComponent, TranslateModuleMock],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(InputSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

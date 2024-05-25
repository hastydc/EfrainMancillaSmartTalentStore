import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksComponent } from './thanks.component';
import { TranslateModuleMock } from '../../../../shared/tests/utils.mock';
import { ActivatedRoute } from '@angular/router';

describe('ThanksComponent', () => {
  let component: ThanksComponent;
  let fixture: ComponentFixture<ThanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThanksComponent, TranslateModuleMock],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(ThanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

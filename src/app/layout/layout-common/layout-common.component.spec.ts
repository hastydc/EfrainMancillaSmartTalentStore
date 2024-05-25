import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCommonComponent } from './layout-common.component';
import { TranslateModuleMock } from '../../shared/tests/utils.mock';
import { ActivatedRoute } from '@angular/router';

describe('LayoutCommonComponent', () => {
  let component: LayoutCommonComponent;
  let fixture: ComponentFixture<LayoutCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutCommonComponent, TranslateModuleMock],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

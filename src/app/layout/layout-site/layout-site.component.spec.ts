import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSiteComponent } from './layout-site.component';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModuleMock } from '../../shared/tests/utils.mock';

describe('LayoutSiteComponent', () => {
  let component: LayoutSiteComponent;
  let fixture: ComponentFixture<LayoutSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutSiteComponent, TranslateModuleMock],
      providers: [{ provide: ActivatedRoute, useValue: {} }, TranslateService],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

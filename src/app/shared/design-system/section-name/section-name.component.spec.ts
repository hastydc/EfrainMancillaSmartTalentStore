import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionNameComponent } from './section-name.component';
import { TranslateModuleMock } from '../../tests/utils.mock';
import { ActivatedRoute } from '@angular/router';

describe('SectionNameComponent', () => {
  let component: SectionNameComponent;
  let fixture: ComponentFixture<SectionNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionNameComponent, TranslateModuleMock],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

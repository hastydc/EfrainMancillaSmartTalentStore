import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionFormComponent } from './session-form.component';
import { TranslateModuleMock } from '../../../../shared/tests/utils.mock';

describe('SessionFormComponent', () => {
  let component: SessionFormComponent;
  let fixture: ComponentFixture<SessionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionFormComponent, TranslateModuleMock],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

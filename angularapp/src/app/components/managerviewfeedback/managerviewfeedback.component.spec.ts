import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerviewfeedbackComponent } from './managerviewfeedback.component';

describe('ManagerviewfeedbackComponent', () => {
  let component: ManagerviewfeedbackComponent;
  let fixture: ComponentFixture<ManagerviewfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerviewfeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerviewfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

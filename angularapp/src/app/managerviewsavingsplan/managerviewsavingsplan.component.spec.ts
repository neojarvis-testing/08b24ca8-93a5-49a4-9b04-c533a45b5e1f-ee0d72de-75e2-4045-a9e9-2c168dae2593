import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerviewsavingsplanComponent } from './managerviewsavingsplan.component';

describe('ManagerviewsavingsplanComponent', () => {
  let component: ManagerviewsavingsplanComponent;
  let fixture: ComponentFixture<ManagerviewsavingsplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerviewsavingsplanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerviewsavingsplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

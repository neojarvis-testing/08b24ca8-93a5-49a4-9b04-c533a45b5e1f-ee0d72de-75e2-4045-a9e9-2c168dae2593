import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagercreatesavingsplanComponent } from './managercreatesavingsplan.component';

describe('ManagercreatesavingsplanComponent', () => {
  let component: ManagercreatesavingsplanComponent;
  let fixture: ComponentFixture<ManagercreatesavingsplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagercreatesavingsplanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagercreatesavingsplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

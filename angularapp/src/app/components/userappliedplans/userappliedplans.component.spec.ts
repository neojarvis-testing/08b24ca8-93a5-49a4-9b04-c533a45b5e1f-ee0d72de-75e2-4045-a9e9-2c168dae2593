import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAppliedPlansComponent } from './userappliedplans.component';

describe('UserappliedplansComponent', () => {
  let component: UserAppliedPlansComponent;
  let fixture: ComponentFixture<UserAppliedPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAppliedPlansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAppliedPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

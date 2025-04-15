import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiggyBankLoaderComponent } from './piggy-bank-loader.component';

describe('PiggyBankLoaderComponent', () => {
  let component: PiggyBankLoaderComponent;
  let fixture: ComponentFixture<PiggyBankLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiggyBankLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiggyBankLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

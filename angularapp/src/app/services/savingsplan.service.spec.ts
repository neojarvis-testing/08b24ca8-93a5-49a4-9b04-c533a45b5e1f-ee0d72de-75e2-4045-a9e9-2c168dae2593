import { TestBed } from '@angular/core/testing';

import { SavingsplanService } from './savingsplan.service';

describe('SavingsplanService', () => {
  let service: SavingsplanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingsplanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

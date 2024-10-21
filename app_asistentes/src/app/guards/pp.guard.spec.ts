import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ppGuard } from './pp.guard';

describe('ppGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => ppGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

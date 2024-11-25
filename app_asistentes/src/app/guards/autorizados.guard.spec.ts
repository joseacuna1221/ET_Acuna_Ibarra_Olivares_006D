import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { autorizadosGuard } from './autorizados.guard';

describe('autorizadosGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => autorizadosGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { employeeResolver } from './employee.resolver';

describe('employeeResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => employeeResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

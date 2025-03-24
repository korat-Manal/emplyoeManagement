import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { EmployeeService } from '../../../shared/services/employee-services/employee.service';
import { Employee } from '../../../core/interface/employee';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const employeeResolver: ResolveFn<Employee | null> = (route, state) => {
  const employeeService = inject(EmployeeService);
  const router = inject(Router);

  const id = route.paramMap.get('id');

  if (!id) {
    router.navigate(['/employees']);
    return of(null);
  }

  return employeeService.getEmployeeById(id).pipe(
    catchError(() => {
      router.navigate(['/employees']);
      return of(null);
    })
  );
};

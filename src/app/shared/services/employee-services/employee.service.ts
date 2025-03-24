import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Employee } from '../../../core/interface/employee';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  private apiUrl = "http://localhost:3000/employee";
  private employeeSubject = new BehaviorSubject<Employee[]>([]);
  employee$ = this.employeeSubject.asObservable();
  constructor(private http: HttpClient) {
    this.fetchEmployees();
  }

  fetchEmployees(){
    this.http.get<Employee[]>(this.apiUrl).subscribe((emp) =>
      this.employeeSubject.next(emp)
    )
  }

  getEmployee(){
    return this.employee$;
  }

  addEmployee(employee: Omit<Employee, 'id'>): Observable<Employee>{
    const newEmployee: Employee = { id: uuidv4(), ...employee };
    return this.http.post<Employee>(this.apiUrl, newEmployee).pipe(
        tap(() => this.fetchEmployees()
      )
    )
  }

  updateEmployee(updateEmployee: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiUrl}/${updateEmployee.id}`,updateEmployee ).pipe(
        tap(() => this.fetchEmployees()
      )
    )
  }

  deleteEmployee(id: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
        tap(() => this.fetchEmployees()
      ) 
    )
  }
}

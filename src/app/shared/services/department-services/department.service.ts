import { Injectable } from '@angular/core';
import { Department } from '../../../core/interface/department';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {
  private apiUrl = "http://localhost:3000/department";
  private departmentSubject = new BehaviorSubject<Department[]>([]);
  department$ = this.departmentSubject.asObservable();
  constructor(private http: HttpClient) {
    this.fetchDepartments().subscribe();
  }

  fetchDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl).pipe(
      tap(dept => {
        this.departmentSubject.next(dept);
      })
    );
  }
  
  getDepartment(){
    return this.department$;
  }

  addDepartment( Department: Omit<Department, 'id'>): Observable<Department>{
    const newDepartment: Department = { id: uuidv4(), ... Department };
    return this.http.post<Department>(this.apiUrl, newDepartment).pipe(
      tap(() => this.fetchDepartments().subscribe())
    )
  }

  updateDepartment(updateDepartment:  Department): Observable< Department>{
    return this.http.put< Department>(`${this.apiUrl}/${updateDepartment.id}`,updateDepartment ).pipe(
      tap(() => this.fetchDepartments().subscribe()) 
    )
  }

  deleteDepartment(id: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.fetchDepartments().subscribe()) 
    )
  }
}

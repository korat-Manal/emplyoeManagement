import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../../shared/services/employee-services/employee.service';
import { Employee } from '../../../../core/interface/employee';
import { EmployeeListComponent } from "./layout/employee-list/employee-list.component";
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, debounceTime, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-employee-management',
  imports: [EmployeeListComponent],
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.css'
})
export class EmployeeManagementComponent implements OnInit {

  employee: Employee[] = [];
  filteredEmployee: Employee[] = [];
  searchQuery$ = new BehaviorSubject<string>('');
  constructor(private dialog: MatDialog,private employeeServcie: EmployeeService){}

  ngOnInit(): void {
    this.employeeServcie.employee$.subscribe((emp) => {
      console.log("Received Employees: ", emp);
      this.employee = emp;
      this.filteredEmployee = emp;
    })
    this.searchQuery$.pipe(
      debounceTime(1000),
      switchMap(query => {
        const filtered = this.employee.filter(emp =>
          emp.name.toLowerCase().includes(query.toLowerCase())
        );
        return of(filtered);
      })
    ).subscribe(filteredEmployee => {
      this.filteredEmployee = filteredEmployee;
    });
  }

  onSearchInputEvent(event: Event){
    const input = event.target as HTMLInputElement;
    this.searchQuery$.next(input.value);
  }
  
  openAddEmployeeDialog(){
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeServcie.addEmployee(result).subscribe(res => {});
      }
    });
  }
}

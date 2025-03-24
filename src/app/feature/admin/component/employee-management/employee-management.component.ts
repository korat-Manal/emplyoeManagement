import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../../shared/services/employee-services/employee.service';
import { Employee } from '../../../../core/interface/employee';
import { EmployeeListComponent } from "./layout/employee-list/employee-list.component";
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-management',
  imports: [EmployeeListComponent],
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.css'
})
export class EmployeeManagementComponent implements OnInit {

  employee: Employee[] = [];
  constructor(private dialog: MatDialog,private employeeServcie: EmployeeService){}

  ngOnInit(): void {
    this.employeeServcie.employee$.subscribe((emp) => {
      console.log("Received Employees: ", emp);
      this.employee = emp
    })
  }

  onSearchInputEvent(event: Event){

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

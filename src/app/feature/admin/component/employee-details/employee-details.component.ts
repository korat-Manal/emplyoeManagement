import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../shared/services/employee-services/employee.service';
import { Employee } from '../../../../core/interface/employee';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEmployeeComponent } from '../employee-management/components/update-employee/update-employee.component';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-employee-details',
  imports:[MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee | undefined;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.employee = data['employee'];
    });
  }

  editEmployee() {
    const dialogRef = this.dialog.open(UpdateEmployeeComponent, {
      width: '400px',
      data: this.employee
    });

    dialogRef.afterClosed().subscribe(updatedEmployee => {
      if (updatedEmployee) {
        this.employeeService.updateEmployee(updatedEmployee).subscribe(
          () => this.toastr.success('Employee updated successfully'),
          error => this.toastr.error('Error updating employee')
        );
      }
    });
  }

  deleteEmployee() {
    if (this.employee) {
      this.employeeService.deleteEmployee(this.employee.id).subscribe(
        () => this.toastr.success('Employee deleted successfully'),
        error => this.toastr.error('Error deleting employee')
      );
    }
  }
}

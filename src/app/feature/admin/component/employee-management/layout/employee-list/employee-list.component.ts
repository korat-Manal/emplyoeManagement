import { Component, Input } from '@angular/core';
import { Employee } from '../../../../../../core/interface/employee';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEmployeeComponent } from '../../components/update-employee/update-employee.component';
import { EmployeeService } from '../../../../../../shared/services/employee-services/employee.service';
import { DeleteEmployeeComponent } from '../../components/delete-employee/delete-employee.component';
import { AuthService } from '../../../../../../core/auth/service/auth.service';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, MatTableModule, MatIconModule, NgxPaginationModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  @Input() employee : Employee[] = [];
  displayedColumns: String[] = ['name', 'department', 'role' ,'actions'];
  userRole: string | null = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private authService: AuthService,private employeeService: EmployeeService,private dialog: MatDialog, private toastr: ToastrService){
    this.authService.getRole().subscribe((role)=> this.userRole = role)
  }

  onEmployeeUpdateModal(employee: Employee){
    const dialogRef = this.dialog.open(UpdateEmployeeComponent, {
      width:'400px',
      data: employee
    });
    
    dialogRef.afterClosed().subscribe( res => {
      if(res){
        this.employeeService.updateEmployee(res).subscribe(res =>{

        });
      }
      
    })
  }
  
  onEmployeeDeleteModal(id: string){
    const dialogRef = this.dialog.open(DeleteEmployeeComponent  , {
      width: '350px',
      data: { message : 'Are you sure you want to delete this Task ?'}
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.employeeService.deleteEmployee(id).subscribe(() => {

        });
      }
    });
  }

  canDeleteEmployee(){
    return this.userRole === 'Admin' || this.userRole === 'Super Admin';
  }
}

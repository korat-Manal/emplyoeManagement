import { Component, Input } from '@angular/core';
import { Department } from '../../../../../../core/interface/department';
import { AuthService } from '../../../../../../core/auth/service/auth.service';
import { DepartmentService } from '../../../../../../shared/services/department-services/department.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UpdateDepartmentComponent } from '../../components/update-department/update-department.component';
import { DeleteDepartmentComponent } from '../../components/delete-department/delete-department.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-department-list',
  imports: [CommonModule, MatTableModule, MatIconModule, NgxPaginationModule],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css'
})
export class DepartmentListComponent {
  @Input() department : Department[] = [];
  displayedColumns: String[] = ['department', 'actions'];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private  departmentService:DepartmentService, private dialog:MatDialog, private toastr:ToastrService){

  }

  onDepartmentUpdateModal(department:  Department){
    const dialogRef = this.dialog.open(UpdateDepartmentComponent, {
      width:'400px',
      data:department
    });
    
    dialogRef.afterClosed().subscribe( res => {
      if(res){
        this.departmentService.updateDepartment(res).subscribe(res =>{
        });
      }
      
    })
  }
  
  onDepartmentDeleteModal(id: string){
    const dialogRef = this.dialog.open(DeleteDepartmentComponent  , {
      width: '350px',
      data: { message : 'Are you sure you want to delete this  Department?'}
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.departmentService.deleteDepartment(id).subscribe(() => {
        });
      }
    });
  }
}

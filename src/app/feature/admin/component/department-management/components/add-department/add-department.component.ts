import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../../../../../../shared/services/department-services/department.service';
import { Department } from '../../../../../../core/interface/department';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-add-department',
  imports: [
    ReactiveFormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule,
    MatButtonModule],

  templateUrl: './add-department.component.html',
  styleUrl: './add-department.component.css'
})
export class AddDepartmentComponent {
  addDepartmentForm !: FormGroup;

  constructor(
    private toastr: ToastrService,
    private  departmentService: DepartmentService, 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Department){
      this.addDepartmentForm = this.fb.group({
        department: ['', Validators.required],
      })
  }
  onSubmit(){ 
    const newDepartment: Department = {...this.addDepartmentForm.value, id: uuidv4()};

    if(this.addDepartmentForm.valid){
      this.departmentService.addDepartment(newDepartment).subscribe({
        next: (res) =>{
          this.toastr.success('added Successfuly','Success')
          setTimeout(() =>{
            this.onCancel();
          }, 1000);
        },
        error: (error) =>{
          console.error('Error adding task:', error);
        }
      });
    }
  }

  onCancel(){
    this.dialogRef.close();
  }
}

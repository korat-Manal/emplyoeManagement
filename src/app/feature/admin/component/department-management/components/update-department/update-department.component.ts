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

@Component({
  selector: 'app-update-department',
  imports: [
    ReactiveFormsModule, 
    MatDialogModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule, 
  ],
  templateUrl: './update-department.component.html',
  styleUrl: './update-department.component.css'
})
export class UpdateDepartmentComponent {
  updateDepartmentForm !: FormGroup;

  constructor(
    private toastr: ToastrService,
    private  departmentService: DepartmentService, 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Department){
      this.updateDepartmentForm = this.fb.group({
        department: [data?.department || '', Validators.required],
      })
  }
  ngOnInit(): void {
    if(this.data){
      this.updateDepartmentForm.patchValue({
        department: this.data.department,
      })
    }  
  }

  onSubmit(){
    if(this.updateDepartmentForm.valid){
      const updateDepartment:  Department = { ...this.data, ...this.updateDepartmentForm.value };
      this.departmentService.updateDepartment(updateDepartment).subscribe({
        next: ()=>{
          this.toastr.success('Updated Successfuly', 'Success')
          setTimeout(() =>{
            this.onCancel()
          }, 1000);
        },
        error: (err) => {
          console.error('Update Error:', err);
        }
      });
    }
  }
  onCancel(){
    this.dialogRef.close();
  }
}

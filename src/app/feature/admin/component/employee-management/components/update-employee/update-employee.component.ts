import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../../../../../shared/services/employee-services/employee.service';
import { Employee } from '../../../../../../core/interface/employee';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-update-employee',
  imports: [
    ReactiveFormsModule, 
    MatDialogModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule, 
  ],  
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent {
  updateEmployeeForm !: FormGroup;

  constructor(
    private toastr: ToastrService,
    private employeeService: EmployeeService, 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee){
      this.updateEmployeeForm = this.fb.group({
        name: [data?.name || '', Validators.required],
        department: [data?.department || '', Validators.required],
        role: [data?.role || 'Employee', Validators.required],
      })
  }
  ngOnInit(): void {
    if(this.data){
      this.updateEmployeeForm.patchValue({
        name: this.data.name,
        department: this.data.department,
        role: this.data.role
      })
    }  
  }

  onSubmit(){
    if(this.updateEmployeeForm.valid){
      const updateEmployee: Employee = { ...this.data, ...this.updateEmployeeForm.value };
      this.employeeService.updateEmployee(updateEmployee).subscribe({
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

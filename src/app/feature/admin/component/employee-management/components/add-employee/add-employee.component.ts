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
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-add-employee',
  imports: [
    ReactiveFormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  addEmployeeForm !: FormGroup;

  constructor(
    private toastr: ToastrService,
    private employeeService: EmployeeService, 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee){
      this.addEmployeeForm = this.fb.group({
        name: ['', Validators.required],
        department: ['', Validators.required],
        role: ['Employee', Validators.required],
      })
  }
  onSubmit(){ 
    const newEmployee: Employee = {...this.addEmployeeForm.value, id: uuidv4()};

    if(this.addEmployeeForm.valid){
      this.employeeService.addEmployee(newEmployee).subscribe({
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


import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-employee',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.css'
})
export class DeleteEmployeeComponent {
  constructor(
    private toastr: ToastrService,
    public dailogRef: MatDialogRef<DeleteEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ){}

  onConfirm(){
    setTimeout(() => {
      this.dailogRef.close(true);
      this.toastr.success('Deleted Successfuly', 'Success')
    },500)
   
  }
  
  onCancel(){
    this.dailogRef.close(false);
  } 
}

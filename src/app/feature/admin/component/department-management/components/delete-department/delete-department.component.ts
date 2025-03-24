import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-department',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-department.component.html',
  styleUrl: './delete-department.component.css'
})
export class DeleteDepartmentComponent {
  constructor(
    private toastr: ToastrService,
    public dailogRef: MatDialogRef<DeleteDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{message: string }
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

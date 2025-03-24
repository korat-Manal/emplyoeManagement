import { Component } from '@angular/core';
import { BehaviorSubject, debounceTime, of, switchMap } from 'rxjs';
import { Department } from '../../../../core/interface/department';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentService } from '../../../../shared/services/department-services/department.service';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { DepartmentListComponent } from './layout/department-list/department-list.component';

@Component({
  selector: 'app-department-management',
  imports: [DepartmentListComponent],
  templateUrl: './department-management.component.html',
  styleUrl: './department-management.component.css'
})

export class DepartmentManagementComponent {
  department: Department[] = [];
  filteredDepartment: Department[] = [];
  searchQuery$ = new BehaviorSubject<string>('');

  constructor(private dialog: MatDialog, private departmentService: DepartmentService) {}


  ngOnInit(): void {
    this.departmentService.department$.subscribe((dep) => {
      this.department = dep;
      this.filteredDepartment = dep;
      console.log(dep)
      })
    this.searchQuery$.pipe(
      debounceTime(1000),
      switchMap(query => {
        const filtered = this.department.filter(dep =>
          dep.department.toLowerCase().includes(query.toLowerCase())
        );
        return of(filtered);
      })
    ).subscribe(filteredDepartment => {
      this.filteredDepartment = filteredDepartment;
    });
  }

  onSearchInputEvent(event: Event){
    const input = event.target as HTMLInputElement;
    this.searchQuery$.next(input.value);
  }
  
  openAddDepartmentDialog(){
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.departmentService.addDepartment(result).subscribe(res => {});
      }
    });
  }
}

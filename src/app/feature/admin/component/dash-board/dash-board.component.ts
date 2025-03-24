import { Component } from '@angular/core';
import { EmployeeService } from '../../../../shared/services/employee-services/employee.service';

@Component({
  selector: 'app-dash-board',
  imports: [],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent {
  totalEmployees: number = 0;
  totaDepartments: number = 0;

  constructor(private employeeServicer: EmployeeService ){
    this.loadDashboard()
  }

  loadDashboard(){
    
    this.employeeServicer.employee$.subscribe(emp => {
      this.totalEmployees = emp.length
    })

    
  }
}

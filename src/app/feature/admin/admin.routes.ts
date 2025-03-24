import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashBoardComponent } from './component/dash-board/dash-board.component';
import { EmployeeManagementComponent } from './component/employee-management/employee-management.component';
import { DepartmentManagementComponent } from './component/department-management/department-management.component';
import { EmployeeDetailsComponent } from './component/employee-details/employee-details.component';
import { authGuard } from '../../core/auth/auth-guard/auth.guard';
import { employeeResolver } from '../../core/resolver/EmployeeResolver/employee.resolver';

export const adminRoutes: Routes = [
  { path: '', component: AdminComponent, children: [
      { path: '', component: DashBoardComponent, pathMatch: 'full' },
      { path: 'dashboard', component: DashBoardComponent },
      { path: 'employee', component: EmployeeManagementComponent, canActivate: [authGuard], data: { allowedRoles: ['Super Admin', 'Admin', 'Department Manager'] } },
      { path: 'employee/:id', component: EmployeeDetailsComponent, resolve: { employee: employeeResolver }, canActivate: [authGuard],  data: { allowedRoles: ['Super Admin', 'Admin', 'Department Manager'] }},
      { path: 'department', component: DepartmentManagementComponent, canActivate: [authGuard], data: { allowedRoles: ['Super Admin'] } }
  ]}
];
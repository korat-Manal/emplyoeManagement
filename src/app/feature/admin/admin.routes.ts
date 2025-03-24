import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashBoardComponent } from './component/dash-board/dash-board.component';
import { EmployeeManagementComponent } from './component/employee-management/employee-management.component';
import { DepartmentManagementComponent } from './component/department-management/department-management.component';
import { authGuard } from '../../core/auth/auth-guard/auth.guard';

export const adminRoutes: Routes = [
  { path: '', component: AdminComponent, children: [
      { path: '', component: DashBoardComponent, pathMatch: 'full' },
      { path: 'dashboard', component: DashBoardComponent },
      { path: 'employee', component: EmployeeManagementComponent, canActivate: [authGuard], data: { allowedRoles: ['Super Admin', 'Admin', 'Department Manager'] } },
      { path: 'department', component: DepartmentManagementComponent, canActivate: [authGuard], data: { allowedRoles: ['Super Admin'] } }
  ]}
];
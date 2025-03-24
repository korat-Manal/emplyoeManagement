import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { AdminComponent } from './feature/admin/admin.component';
import { EmployeeManagementComponent } from './feature/admin/component/employee-management/employee-management.component';
import { DepartmentManagementComponent } from './feature/admin/component/department-management/department-management.component';
import { DashBoardComponent } from './feature/admin/component/dash-board/dash-board.component';
import { EmployeeProfileComponent } from './feature/employee-profile/employee-profile.component';

export const routes: Routes = [

    { path:'', component: LoginComponent },
    { path:'login', component:LoginComponent},
    { path:'admin', component: AdminComponent, children:[
        { path: '', component: DashBoardComponent },
        { path:'dashboard', component: DashBoardComponent },
        { path:'employee',component: EmployeeManagementComponent },
        { path:'department', component: DepartmentManagementComponent}
    ]},
    { path:'employee-profile', component:EmployeeProfileComponent},
    { path:'**', component: LoginComponent }
];

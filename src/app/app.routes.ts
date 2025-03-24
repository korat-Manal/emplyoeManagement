import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { AdminComponent } from './feature/admin/admin.component';
import { EmployeeProfileComponent } from './feature/employee-profile/employee-profile.component';
import { authGuard } from './core/auth/auth-guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [authGuard] },
    { 
        path: 'admin', 
        component: AdminComponent, 
        canActivate: [authGuard],
        data: { allowedRoles: ['Super Admin', 'Admin', 'Department Manager'] },
        loadChildren: () => import('./feature/admin/admin.routes').then(m => m.adminRoutes)
    },
    { 
        path: 'employee-profile', 
        component: EmployeeProfileComponent, 
        canActivate: [authGuard], 
        data: { allowedRoles: ['Employee'] } 
    },
    { path: '**', redirectTo: 'login' }
];

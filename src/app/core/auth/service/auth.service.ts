import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userRole = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));
  userDepartment = new BehaviorSubject<string | null>(localStorage.getItem('userDepartment'));

  constructor(private toastr: ToastrService, private router: Router) { }

  login(email: string, password: string): void {
    const users = [
      { "email": 'm@gmail.com', "password": '123456', "role": 'Super Admin', "department": 'all' },
      { "email": 'k@gmail.com', "password": '123456', "role": 'Admin', "department": 'IT' },
      { "email": 'y@gmail.com', "password": '123456', "role": 'Department Manager', "department": 'HR' },
      { "email": 'e@gmail.com', "password": '123456', "role": 'Employee', "department": 'none' }
    ];
  
    const user = users.find(user => user.email === email && user.password === password);
  
    if (user) {
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userDepartment', user.department);
      this.userRole.next(user.role);
      this.userDepartment.next(user.department);
  
      this.toastr.success('User Logged in Successfully', 'Success');
  
      switch (user.role) {
        case 'Super Admin':
        case 'Admin':
        case 'Department Manager':
          this.router.navigate(['/admin/dashboard']);
          break;
        case 'Employee':
          this.router.navigate(['/employee-profile']);
          break;
        default:
          this.router.navigate(['/login']);
      }
    } else {
      this.toastr.error('Invalid Credentials', 'Error');
    }
  }

  logout(): void {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userDepartment');
    this.userRole.next(null);
    this.userDepartment.next(null);
    this.router.navigate(['/login']);
  }

  getRole(): Observable<string | null> {
    return this.userRole.asObservable();
  }

  getCurrentRole(): string | null {
    return localStorage.getItem('userRole');
  }

  getCurrentDepartment(): string | null {
    return localStorage.getItem('userDepartment');
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userRole = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));

  constructor(private toastr: ToastrService, private router: Router) { }

  login(email: string, password: string): void {
    const users = [
      {
        "email":'m@gmail.com',
        "password": '123456',
        "role": 'Super Admin',
        "department": 'all',
      },
      {
        "email":'k@gmail.com',
        "password": '123456',
        "role": 'Admin',
        "department": 'it',
      },
      {
        "email":'y@gmail.com',
        "password": '123456',
        "role": 'Department Manager',
        "department": 'it',
      },
    ]

    const user = users.find((user)=> user.email === email && user.password === password);

    if(user){
      localStorage.setItem('userRole', user.role);
      setTimeout(() => {
        this.toastr.success('User Loggedin SuccessFully', 'Success');

        switch(user.role){
          case 'Super Admin':
            this.router.navigate(['/admin']);
            break;
          case 'Admin':
            this.router.navigate(['/admin']);
            break;
          case 'Department Manager':
            this.router.navigate(['/admin']);
            break;
          case 'employee':
            this.router.navigate(['/employee-profile']);
            break;
        }

      },1000);
    }else {
      this.toastr.error('Invalid Credntial', 'error');
    }
  }

  logout(){
    localStorage.removeItem('userRole');
    this.userRole.next(null);
    this.router.navigate(['/login'])
  }

  getRole(): Observable<string | null>{
    return this.userRole.asObservable();
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../../../../core/auth/service/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  imports: [RouterModule, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  userRole: string | null = '';
  
  constructor(private authService: AuthService){
    this.authService.getRole().subscribe((res) => this.userRole = res );
  }

  canOpenDepartment(){
    return this.userRole === 'Super Admin';
  }

  logout(){
    this.authService.logout();
  }
}

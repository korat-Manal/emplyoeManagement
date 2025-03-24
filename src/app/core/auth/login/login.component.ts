import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-login',
  imports: [ 
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(private authService: AuthService,private fb: FormBuilder, private toastr: ToastrService){
    this.loginForm = this.fb.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }
  
  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }

  onLogin(){
    if(this.loginForm.invalid){
      this.toastr.error("Invalid Credential",'Error');
      return;
    }
    
    const{ email , password} = this.loginForm.value;
    this.authService.login(email, password);
  }
}

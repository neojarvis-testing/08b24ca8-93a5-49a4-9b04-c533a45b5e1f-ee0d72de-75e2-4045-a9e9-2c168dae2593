import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Clear any existing session or token on the login page load
    this.authService.logout();
  }

  // Login function triggered on form submission
  login(form: NgForm): void {
    if (!form.valid) {
      alert('Please fill all the required fields with valid data.');
      return;
    }

    const loginUser: Login = {
      Email: this.email,
      Password: this.password
    };

    // Proceed with the login process
    if (loginUser.Email && loginUser.Password) {
      this.authService.login(loginUser).subscribe({
        next: () => {
          console.log(this.authService.getUser());
          if (this.authService.isRegionalManager()) {
            this.router.navigate(['/RegionalManager']);
          } else if (this.authService.isCustomer()) {
            this.router.navigate(['/Customer']);
          }
        },
        error: (error: any) => {
          const errorMessage = error.error?.message || error.message || 'An unknown error occurred';

          // Handle specific error messages
          if (errorMessage === 'Invalid Email.') {
            this.email = '';
            this.password = '';
            alert('Invalid Email.');
          } else if (errorMessage === 'Invalid Password.') {
            this.password = '';
            alert('Invalid Password.');
          } else {
            console.error('Login failed', error);
            alert('Login failed. Please try again later.');
          }
        }
      });
    } else {
      alert('Please enter both email and password.');
    }
  }

  // Navigation to Register Page
  navigateToRegister(): void {
    this.router.navigate(['/Register']);
  }

  // Validation checks for password requirements
  checkLowercase(): boolean {
    return /[a-z]/.test(this.password);
  }

  checkUppercase(): boolean {
    return /[A-Z]/.test(this.password);
  }

  checkDigit(): boolean {
    return /\d/.test(this.password);
  }

  checkSpecialChar(): boolean {
    return /[!@#$%^&*]/.test(this.password);
  }

  checkMinLength(): boolean {
    return this.password.length >= 8;
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  otp: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  showOtpModal: boolean = false; // OTP Modal visibility
  showForgotPasswordModal: boolean = false; // Forgot Password Modal visibility
  showResetPasswordModal: boolean = false; // Reset Password Modal visibility
  currentUser: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialize the reactive form
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$'
          ),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.authService.logout();
  }

  // Step 1: Generate OTP
  generateOtp(): void {
    if (this.loginForm.invalid) {
      alert('Please fill all the required fields with valid data.');
      return;
    }

    const loginUser: Login = {
      Email: this.loginForm.value.email,
      Password: this.loginForm.value.password,
    };

    this.authService.login(loginUser).subscribe({
      next: () => {
        this.showOtpModal = true; // Show OTP modal after successful OTP generation
      },
      error: (error: any) => {
        const errorMessage =
          error.error?.message || error.message || 'An unknown error occurred';

        if (errorMessage === 'Invalid Email.') {
          this.loginForm.reset();
          alert('Invalid Email.');
        } else if (errorMessage === 'Invalid Password.') {
          this.loginForm.controls['password'].reset();
          alert('Invalid Password.');
        } else {
          console.error('Login failed', error);
          alert('Login failed. Please try again later.');
        }
      },
    });
  }

  // Step 2: Verify OTP
  verifyOtp(): void {
    const loginUser: Login = {
      Email: this.loginForm.value.email,
      Password: this.loginForm.value.password,
    };

    this.authService.verifyLoginOtp(loginUser, this.otp).subscribe({
      next: () => {
        this.currentUser = this.authService.getUser();
        console.log(this.currentUser);
        // Redirect user based on role
        if (this.currentUser.role == 'RegionalManager') {
          this.router.navigate(['/Manager/Dashboard']);
        } else if (this.currentUser.role == 'Customer') {
          this.router.navigate(['/User/Home']);
        }
      },
      error: (error: any) => {
        alert(error.error?.message || 'Invalid OTP. Please try again.');
      },
    });
  }

  // Resend OTP
  resendOtp(): void {
    const loginUser: Login = {
      Email: this.loginForm.value.email,
      Password: this.loginForm.value.password,
    };

    this.authService.login(loginUser).subscribe({
      next: () => {
        alert('OTP has been resent to your email.');
      },
      error: (error: any) => {
        alert(error.error?.message || 'Failed to resend OTP.');
      },
    });
  }

  // Close OTP Modal
  closeOtpModal(): void {
    this.showOtpModal = false; // Hide OTP modal
    this.otp = ''; // Clear OTP input field
  }

  // Open Forgot Password Modal
  openForgotPassword(): void {
    this.showForgotPasswordModal = true;
  }

  // Step 1 for Forgot Password: Send OTP
  sendForgotPasswordOtp(): void {
    if (!this.loginForm.controls['email'].valid) {
      alert('Please provide a valid email.');
      return;
    }

    this.authService.forgotPassword(this.loginForm.value.email).subscribe({
      next: () => {
        alert('OTP has been sent to your email.');
        this.showForgotPasswordModal = false;
        this.showResetPasswordModal = true;
      },
      error: (error: any) => {
        alert(error.error?.message || 'Failed to send OTP.');
      },
    });
  }

  // Step 2 for Forgot Password: Reset Password
  resetPassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    var resetModel: Login = {
      Email: this.loginForm.value.email,
      Password: this.newPassword,
    };

    this.authService.verifyOtpResetPassword(resetModel, this.otp).subscribe({
      next: () => {
        alert('Password has been reset successfully.');
        this.showResetPasswordModal = false;
      },
      error: (error: any) => {
        alert(error.error?.message || 'Failed to reset password.');
      },
    });
  }

  // Navigation to Register Page
  navigateToRegister(): void {
    this.router.navigate(['/Register']);
  }

  // Password validations for UI
  checkLowercase(): boolean {
    return /[a-z]/.test(this.loginForm.value.password);
  }

  checkUppercase(): boolean {
    return /[A-Z]/.test(this.loginForm.value.password);
  }

  checkDigit(): boolean {
    return /\d/.test(this.loginForm.value.password);
  }

  checkSpecialChar(): boolean {
    return /[!@#$%^&*]/.test(this.loginForm.value.password);
  }

  checkMinLength(): boolean {
    return this.loginForm.value.password?.length >= 8;
  }
}
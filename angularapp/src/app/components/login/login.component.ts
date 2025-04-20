import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  otp: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  showOtpModal: boolean = false; // OTP Modal visibility
  showForgotPasswordModal: boolean = false; // Forgot Password Modal visibility
  showResetPasswordModal: boolean = false; // Reset Password Modal visibility
  currentUser: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.logout();
  }

  // Step 1: Generate OTP
  generateOtp(form: NgForm): void {
    if (!form.valid) {
      alert('Please fill all the required fields with valid data.');
      return;
    }

    const loginUser: Login = {
      Email: this.email,
      Password: this.password,
    };

    this.authService.login(loginUser).subscribe({
      next: () => {
        this.showOtpModal = true; // Show OTP modal after successful OTP generation
      },
      error: (error: any) => {
        const errorMessage =
          error.error?.message || error.message || 'An unknown error occurred';

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
      },
    });
  }

  // Step 2: Verify OTP
  verifyOtp(): void {
    const loginUser: Login = {
      Email: this.email,
      Password: this.password,
    };

    this.authService.verifyLoginOtp(loginUser, this.otp).subscribe({
      next: () => {
        this.currentUser = this.authService.getUser();
        console.log(this.currentUser);
        // Redirect user based on role
        if (this.currentUser.role == 'RegionalManager') {
          this.router.navigate(['/RegionalManager']);
        } else if (this.currentUser.role == 'Customer') {
          this.router.navigate(['/Customer']);
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
      Email: this.email,
      Password: this.password,
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
    this.authService.forgotPassword(this.email).subscribe({
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
      Email: this.email,
      Password: this.newPassword,
    };

    this.authService.verifyOtpResetPassword(resetModel, this.otp).subscribe({
      next: () => {
        this.password = '';
        resetModel = null;
        this.otp = null;
        this.newPassword = '';
        alert('Password has been reset successfully.');
        this.showResetPasswordModal = false;
      },
      error: (error: any) => {
        alert(error.error?.message || 'Failed to reset password.');
      },
    });
  }
// Close Forgot Password Modal
closeForgotPasswordModal(): void {
  this.showForgotPasswordModal = false; // Hide Forgot Password modal
  this.email = ''; // Clear email input field
}
// Close Reset Password Modal
closeResetPasswordModal(): void {
  this.showResetPasswordModal = false; // Hide Reset Password modal
  this.otp = ''; // Clear OTP input field
  this.newPassword = ''; // Clear new password field
  this.confirmPassword = ''; // Clear confirm password field
}
  // Navigation to Register Page
  navigateToRegister(): void {
    this.router.navigate(['/Register']);
  }

  // Password validations
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

  checkpassword(): boolean {
    return this.password !== this.confirmPassword;
  }
}
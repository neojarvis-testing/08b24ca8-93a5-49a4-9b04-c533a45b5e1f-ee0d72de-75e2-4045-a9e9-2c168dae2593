import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  mobile: string = '';
  role: 'Customer' | 'RegionalManager' = 'Customer';
  otp: string = '';
  showOtpModal: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  // Step 1: Generate OTP
  generateOtp(form: NgForm): void {
    if (form.valid) {
      const newUser: User = {
        UserId: 0,
        Email: this.email,
        Password: this.password,
        Username: this.username,
        MobileNumber: this.mobile,
        UserRole: this.role,
      };

      this.authService.register(newUser).subscribe({
        next: () => {
          this.showOtpModal = true;
        },
        error: (error: any) => {
          alert(error.message || 'Something went wrong. Please try again.');
        },
      });
    }
  }

  // Step 2: Verify OTP
  verifyOtp(): void {
    const newUser: User = {
      UserId: 0,
      Email: this.email,
      Password: this.password,
      Username: this.username,
      MobileNumber: this.mobile,
      UserRole: this.role,
    };

    this.authService.verifyRegistrationOtp(newUser, this.otp).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['/Login']);
      },
      error: (error: any) => {
        alert(error.message || 'Invalid OTP. Please try again.');
      },
    });
  }

  // Resend OTP
  resendOtp(): void {
    this.generateOtp({ valid: true } as NgForm);
  }

  // Close OTP Modal
  closeOtpModal(): void {
    this.showOtpModal = false; // Set the modal visibility to false
    this.otp = ''; // Optionally clear the OTP input field
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
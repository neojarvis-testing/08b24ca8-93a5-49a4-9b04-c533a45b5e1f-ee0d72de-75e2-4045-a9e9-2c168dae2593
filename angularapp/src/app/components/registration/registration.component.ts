import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  mobile: string = '';
  role: 'Customer' | 'RegionalManager' = 'Customer';
  formSubmitted: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register(form: NgForm): void {
  this.formSubmitted = true;
  if (form.valid) {
    const newUser: User = {
      UserId: 0,
      Email: this.email,
      Password: this.password,
      UserName: this.username,
      MobileNumber: this.mobile,
      UserRole: this.role,
    };

    this.authService.register(newUser).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['/Login']);
      },
      error: (error: any) => {
        // Directly display the backend error message
        alert(error.message || 'Something went wrong. Please try again.');
      },
    });
  }
}

  // Password match validation
  checkpassword(): boolean {
    return this.password !== this.confirmPassword;
  }

  // Password strength validations
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
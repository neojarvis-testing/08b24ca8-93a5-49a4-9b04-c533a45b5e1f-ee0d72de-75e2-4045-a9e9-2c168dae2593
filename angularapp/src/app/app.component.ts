import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularapp';
  currentRole: string = 'navbar'; // Default

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to role changes
    this.authService.role$.subscribe(role => {
      this.currentRole = role;
    });
  }
}
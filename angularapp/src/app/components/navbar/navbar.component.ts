import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService:AuthService,private router:Router ) { }
  // logout(): void {
  //   this.authService.logout();
  //   this.router.navigate(['/login']);
  // }
  
darkMode: boolean = false;

 toggleDarkMode(): void {
 this.darkMode = !this.darkMode;
 document.body.classList.toggle('dark-mode');
 }



  ngOnInit(): void {
  }

}

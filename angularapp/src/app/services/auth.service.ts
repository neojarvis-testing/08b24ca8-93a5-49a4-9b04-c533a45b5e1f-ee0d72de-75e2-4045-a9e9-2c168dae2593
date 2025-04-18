import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public baseUrl = environment.apiUrl;

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  private roleSubject = new BehaviorSubject<string>('navbar'); // Default to 'navbar'
  public role$: Observable<string> = this.roleSubject.asObservable();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.updateRole(); // Initialize role on service load
  }

  // Register user
  register(newUser: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, newUser).pipe(
      catchError((error: HttpErrorResponse) => {
        const backendMessage = error.error || error.message || 'An unexpected error occurred.';
        return throwError(() => new Error(backendMessage));
      })
    );
  }

  // Login user
  login(loginUser: Login): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, loginUser).pipe(
      tap((response) => {
        const token = response.token;

        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const user = {
            userId: payload.userId,
            userName: payload.userName,
            email: payload.email,
            role: payload.role,
          };
          localStorage.setItem('jwtToken', token);
          this.currentUserSubject.next(user);
          this.updateRole(); // Update role after login
        }
      }),
      catchError((error: HttpErrorResponse) => {
        const backendMessage = error.error || error.message || 'Invalid login credentials.';
        return throwError(() => new Error(backendMessage));
      })
    );
  }


  getUserById(userId: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
  
    return this.http.get<any>(`${this.baseUrl}/Users/${userId}`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        const backendMessage = error.error || error.message || 'An error occurred while fetching user data.';
        return throwError(() => new Error(backendMessage));
      })
    );
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(new Date().getTime() / 1000);
    return payload.exp > currentTime;
  }

  // Get user details
  getUser(): any {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return null;
    }
    const decodedToken: any = jwtDecode(token);
    return {
      userId: decodedToken.userId,
      username: decodedToken.userName,
      role: decodedToken.role,
      email: decodedToken.email,
    };
  }
  

  // Update the current role
  private updateRole(): void {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.roleSubject.next('navbar'); // Default to 'navbar' when no token exists
      return;
    }
    const decodedToken: any = jwtDecode(token);
    const role = decodedToken.role || 'navbar';
    this.roleSubject.next(role); // Emit the current role
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('jwtToken');
    this.currentUserSubject.next(null);
    this.roleSubject.next('navbar'); // Reset role to default
  }
}
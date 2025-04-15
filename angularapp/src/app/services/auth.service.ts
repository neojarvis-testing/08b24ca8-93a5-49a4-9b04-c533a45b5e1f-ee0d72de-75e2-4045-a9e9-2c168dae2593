import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public baseUrl = 'https://8080-abbcbfccbdfecdecaaeaadadfeeddeeaecdae.premiumproject.examly.io/api';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Register user
  register(newUser: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, newUser).pipe(
      catchError((error: HttpErrorResponse) => {
        // Extract error message and pass it to the caller
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
          // Decode token to extract user details
          const payload = JSON.parse(atob(token.split('.')[1]));
          const user = {
            userId: payload.userId,
            email: payload.email,
            role: payload.role,
          };

          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('jwtToken', token);
          this.currentUserSubject.next(user);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Extract error message and pass it to the caller
        const backendMessage = error.error || error.message || 'Invalid login credentials.';
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

    // Check token expiration
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(new Date().getTime() / 1000); // Current time in seconds
    return payload.exp > currentTime; // Check if token is still valid
  }

  // Check if user is Customer
  isCustomer(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user && user.role === 'Customer';
  }

  // Check if user is RegionalManager
  isRegionalManager(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user && user.role === 'RegionalManager';
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('jwtToken');
    this.currentUserSubject.next(null);
  }
}
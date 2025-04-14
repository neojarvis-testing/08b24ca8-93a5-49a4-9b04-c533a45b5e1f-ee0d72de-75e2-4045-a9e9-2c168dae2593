import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,BehaviorSubject, throwError } from 'rxjs';

import {catchError, tap} from 'rxjs/operators';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public baseUrl = 'https://8080-08b24ca8-93a5-49a4-9b04-c533a45b5e1f-ee0d72de-75e2-4045-a9e9-2c168dae2593.premiumproject.examly.io/api/users';


  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue():User{
    return this.currentUserSubject.value;
  }

  register(newUser: User): Observable<User> {
  return this.http.post<User>(`${this.baseUrl}/register`, newUser).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 409) {
        return throwError(() => new Error(error.error?.message || 'User already exists.'));
      }
      return throwError(() => new Error('Something went wrong. Please try again.'));
    })
  );
}

  login(loginUser: Login): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, loginUser).pipe(
      tap(response => {
        const user=response.User;
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  isRegionalManager(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user && user.Role === 'Regional Manager';
  }

  isCustomer(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user && user.Role === 'Customer';
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
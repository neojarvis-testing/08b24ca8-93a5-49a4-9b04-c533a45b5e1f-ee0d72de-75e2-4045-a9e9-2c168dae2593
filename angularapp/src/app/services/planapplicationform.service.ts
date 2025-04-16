import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PlanApplication } from '../models/planapplication.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PlanapplicationformService {

  public baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  addPlanApplication(data: PlanApplication): Observable<PlanApplication> {
    return this.http.post<PlanApplication>(this.baseUrl, data, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
   }
    
    deletePlanApplication(planId: number): Observable<void> {
  
       const url = `${this.baseUrl}/${planId}`;
  
       return this.http.delete<void>(url, { headers: this.getHeaders() })

       .pipe(
          catchError(this.handleError)
          );
      }

      
    getAppliedPlans(userId: number): Observable<PlanApplication[]> {
       const url = `${this.baseUrl}/user/${userId}`;
       return this.http.get<PlanApplication[]>(url, { headers: this.getHeaders() })
          .pipe( 
            catchError(this.handleError)
          );
     }

     
      getAllPlanApplications(): Observable<PlanApplication[]> {
       return this.http.get<PlanApplication[]>(`${this.baseUrl}/PlanApplication`, { headers: this.getHeaders() })
       .pipe(
         catchError(this.handleError)
         );
     }
     
      updatePlanApplication(planId: number, updatedData: PlanApplication): Observable<PlanApplication> {
      const url = `${this.baseUrl}/api/PlanApplication/${planId}`;
      return this.http.put<PlanApplication>(url, updatedData, { headers: this.getHeaders() })
       .pipe(
        catchError(this.handleError)
        );
       }
  
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}

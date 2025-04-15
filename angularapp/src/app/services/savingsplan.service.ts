// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { SavingsPlan } from '../models/savingsplan.model';
// import { PlanApplication } from '../models/planapplication.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class SavingsplanService {
//   public apiUrl = 'https://8080-daabfcebbfcbadecdecaaeaadadfeeddeeaecdae.premiumproject.examly.io';
//   // private planApplicationsUrl = 'https://8080-daabfcebbfcbadecdecaaeaadadfeeddeeaecdae.premiumproject.examly.io/api/planapplications/user';

//   constructor(private http: HttpClient) { }

//   private getAuthHeaders(): HttpHeaders {
//     const token = localStorage.getItem('authToken');
//     return new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//   }

//   getAllSavingsPlans(): Observable<SavingsPlan[]> {
//     return this.http.get<SavingsPlan[]>(`${this.apiUrl}/api/SavingsPlans`);
//   }

//   // getAppliedPlans(userId: string): Observable<PlanApplication[]> {
//   //   const url = `${this.planApplicationsUrl}/${userId}`;
//   //   return this.http.get<PlanApplication[]>(url, { headers: this.getAuthHeaders() });
//   // }

//   deleteSavingsPlan(savingsPlanId: string): Observable<void> {
//     const url = `${this.apiUrl}/api/SavingsPlans/${savingsPlanId}`;
//     return this.http.delete<void>(url, { headers: this.getAuthHeaders() });
//   }

//   getSavingsPlanById(id: string): Observable<SavingsPlan> {
//     const url = `${this.apiUrl}/api/SavingsPlans/${id}`;
//     return this.http.get<SavingsPlan>(url, { headers: this.getAuthHeaders() });
//   }

//   // addSavingsPlan(requestObject: SavingsPlan): Observable<SavingsPlan> {
//   //   return this.http.post<SavingsPlan>(this.apiUrl, requestObject, { headers: this.getAuthHeaders() });
//   // }

//   addSavingsPlan(requestObject: SavingsPlan): Observable<SavingsPlan> {
//     return this.http.post<SavingsPlan>(`${this.apiUrl}/api/SavingsPlans`, requestObject, {
//         headers: this.getAuthHeaders()
//     });
// }

//   updateSavingsPlan(id: string, requestObject: SavingsPlan): Observable<SavingsPlan> {
//     const url = `${this.apiUrl}/api/SavingsPlans/${id}`;
//     return this.http.put<SavingsPlan>(url, requestObject, { headers: this.getAuthHeaders() });
//   }
// }
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SavingsPlan } from '../models/savingsplan.model';
import { environment } from 'src/environments/environment';
import { PlanApplication } from '../models/planapplication.model';

@Injectable({
  providedIn: 'root'
})
export class SavingsplanService {
  public apiUrl: string = 'https://8080-daabfcebbfcbadecdecaaeaadadfeeddeeaecdae.premiumproject.examly.io';


  constructor(private httpClient: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  public addSavingsPlan(requestObject: SavingsPlan): Observable<SavingsPlan> {
    return this.httpClient.post<SavingsPlan>(this.apiUrl + "/api/savingsplan", requestObject, { headers: this.getHeaders() });
  }
 
  public getAllSavingsPlans(): Observable<SavingsPlan[]> {
    return this.httpClient.get<SavingsPlan[]>(this.apiUrl + "/api/savingsplan", { headers: this.getHeaders() });
  }
 
  public deleteSavingsPlan(savingsPlanId: number): Observable<void> {
    return this.httpClient.delete<void>(this.apiUrl + "/api/savingsplan/" + savingsPlanId, { headers: this.getHeaders() });
  }
 
  public getSavingsPlanById(id: number): Observable<SavingsPlan> {
    return this.httpClient.get<SavingsPlan>(this.apiUrl + "/api/savingsplan/" + id, { headers: this.getHeaders() });
  }
 
  public updateSavingsPlan(id: number, requestObject: SavingsPlan): Observable<SavingsPlan> {
    return this.httpClient.put<SavingsPlan>(this.apiUrl + "/api/savingsplan/" + id, requestObject, { headers: this.getHeaders() });
  }
 
  public getAppliedPlans(userId: number): Observable<PlanApplication[]> {
    return this.httpClient.get<PlanApplication[]>(this.apiUrl + "/api/planapplications/user/" + userId, { headers: this.getHeaders() });
  }
}

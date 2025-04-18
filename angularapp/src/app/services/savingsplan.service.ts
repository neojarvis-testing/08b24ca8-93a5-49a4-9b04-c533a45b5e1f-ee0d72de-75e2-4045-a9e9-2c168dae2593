// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { SavingsPlan } from '../models/savingsplan.model';
// import { PlanApplication } from '../models/planapplication.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class SavingsplanService {
//   public baseUrl = 'https://8080-daabfcebbfcbadecdecaaeaadadfeeddeeaecdae.premiumproject.examly.io';
//   // private planApplicationsUrl = 'https://8080-daabfcebbfcbadecdecaaeaadadfeeddeeaecdae.premiumproject.examly.io/api/planapplications/user';

//   constructor(private http: HttpClient) { }

//   private getAuthHeaders(): HttpHeaders {
//     const token = localStorage.getItem('authToken');
//     return new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//   }

//   getAllSavingsPlans(): Observable<SavingsPlan[]> {
//     return this.http.get<SavingsPlan[]>(`${this.baseUrl}/api/SavingsPlans`);
//   }

//   // getAppliedPlans(userId: string): Observable<PlanApplication[]> {
//   //   const url = `${this.planApplicationsUrl}/${userId}`;
//   //   return this.http.get<PlanApplication[]>(url, { headers: this.getAuthHeaders() });
//   // }

//   deleteSavingsPlan(savingsPlanId: string): Observable<void> {
//     const url = `${this.baseUrl}/api/SavingsPlans/${savingsPlanId}`;
//     return this.http.delete<void>(url, { headers: this.getAuthHeaders() });
//   }

//   getSavingsPlanById(id: string): Observable<SavingsPlan> {
//     const url = `${this.baseUrl}/api/SavingsPlans/${id}`;
//     return this.http.get<SavingsPlan>(url, { headers: this.getAuthHeaders() });
//   }

//   // addSavingsPlan(requestObject: SavingsPlan): Observable<SavingsPlan> {
//   //   return this.http.post<SavingsPlan>(this.baseUrl, requestObject, { headers: this.getAuthHeaders() });
//   // }

//   addSavingsPlan(requestObject: SavingsPlan): Observable<SavingsPlan> {
//     return this.http.post<SavingsPlan>(`${this.baseUrl}/api/SavingsPlans`, requestObject, {
//         headers: this.getAuthHeaders()
//     });
// }

//   updateSavingsPlan(id: string, requestObject: SavingsPlan): Observable<SavingsPlan> {
//     const url = `${this.baseUrl}/api/SavingsPlans/${id}`;
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

  public baseUrl = environment.apiUrl;


  constructor(private httpClient: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken'); // Retrieve token from local storage
    if (!token) {
        throw new Error('User is not authenticated.');
    }

    return new HttpHeaders({
        Authorization: `Bearer ${token}`
    });
}

  public addSavingsPlan(requestObject: SavingsPlan): Observable<SavingsPlan> {
    return this.httpClient.post<SavingsPlan>(this.baseUrl + "/savingsplan", requestObject, { headers: this.getAuthHeaders() });
  }
 
  public getAllSavingsPlans(): Observable<SavingsPlan[]> {
    return this.httpClient.get<SavingsPlan[]>(this.baseUrl + "/savingsplan", { headers: this.getAuthHeaders() });
  }
 
  public deleteSavingsPlan(savingsPlanId: number): Observable<void> {
    return this.httpClient.delete<void>(this.baseUrl + "/savingsplan/" + savingsPlanId, { headers: this.getAuthHeaders() });
  }
 
  public getSavingsPlanById(id: number): Observable<SavingsPlan> {
    return this.httpClient.get<SavingsPlan>(this.baseUrl + "/savingsplan/" + id, { headers: this.getAuthHeaders() });
  }
 
  public updateSavingsPlan(id: number, requestObject: SavingsPlan): Observable<SavingsPlan> {
    return this.httpClient.put<SavingsPlan>(this.baseUrl + "/savingsplan/" + id, requestObject, { headers: this.getAuthHeaders() });
  }
 
  public getAppliedPlans(userId: number): Observable<PlanApplication[]> {
    return this.httpClient.get<PlanApplication[]>(this.baseUrl + "/planapplications/user/" + userId, { headers: this.getAuthHeaders() });
  }
}

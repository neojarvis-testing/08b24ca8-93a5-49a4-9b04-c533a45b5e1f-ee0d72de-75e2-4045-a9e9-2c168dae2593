import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SavingsPlan } from '../models/savingsplan.model';
import { PlanApplication } from '../models/planapplication.model';

@Injectable({
  providedIn: 'root'
})
export class SavingsplanService {
  public apiUrl = 'https://8080-aeddfacaccecdecaaeaadadfeeddeeaecdae.premiumproject.examly.io';
  // private planApplicationsUrl = 'https://8080-daabfcebbfcbadecdecaaeaadadfeeddeeaecdae.premiumproject.examly.io/api/planapplications/user';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllSavingsPlans(): Observable<SavingsPlan[]> {
    return this.http.get<SavingsPlan[]>(`${this.apiUrl}/api/SavingsPlans`);
  }

  // getAppliedPlans(userId: string): Observable<PlanApplication[]> {
  //   const url = `${this.planApplicationsUrl}/${userId}`;
  //   return this.http.get<PlanApplication[]>(url, { headers: this.getAuthHeaders() });
  // }

  deleteSavingsPlan(savingsPlanId: string): Observable<void> {
    const url = `${this.apiUrl}/api/SavingsPlans/${savingsPlanId}`;
    return this.http.delete<void>(url, { headers: this.getAuthHeaders() });
  }

  getSavingsPlanById(id: string): Observable<SavingsPlan> {
    const url = `${this.apiUrl}/api/SavingsPlans/${id}`;
    return this.http.get<SavingsPlan>(url, { headers: this.getAuthHeaders() });
  }

  // addSavingsPlan(requestObject: SavingsPlan): Observable<SavingsPlan> {
  //   return this.http.post<SavingsPlan>(this.apiUrl, requestObject, { headers: this.getAuthHeaders() });
  // }

  addSavingsPlan(requestObject: SavingsPlan): Observable<SavingsPlan> {
    return this.http.post<SavingsPlan>(`${this.apiUrl}/api/SavingsPlans`, requestObject, {
        headers: this.getAuthHeaders()
    });
}

  updateSavingsPlan(id: string, requestObject: SavingsPlan): Observable<SavingsPlan> {
    const url = `${this.apiUrl}/api/SavingsPlans/${id}`;
    return this.http.put<SavingsPlan>(url, requestObject, { headers: this.getAuthHeaders() });
  }
}

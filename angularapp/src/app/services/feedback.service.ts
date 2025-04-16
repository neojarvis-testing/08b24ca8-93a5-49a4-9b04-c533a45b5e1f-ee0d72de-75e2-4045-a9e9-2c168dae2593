import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  
  public baseUrl = environment.apiUrl

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      
      Authorization: `Bearer ${localStorage.getItem('authToken')}`

    });

  }

  constructor(private http: HttpClient) { }

  sendFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.baseUrl}/feedback`, {
      headers: this.getAuthHeaders()
    });

  }
  getAllFeedbacksByUserId(userId: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}/feedback/user/${userId}`, {
      headers: this.getAuthHeaders()
    });

  }
  deleteFeedback(feedbackId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/feedback/${feedbackId}`, {
      headers: this.getAuthHeaders()
    });
  }
  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}`, {
      headers: this.getAuthHeaders()
    });
  }

}

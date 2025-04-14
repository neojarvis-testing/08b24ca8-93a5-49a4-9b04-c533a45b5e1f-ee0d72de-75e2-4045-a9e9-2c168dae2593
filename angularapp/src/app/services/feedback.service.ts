import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  public baseUrl = '';

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      
      Authorization: `Bearer ${localStorage.getItem('authToken')}`

    });

  }



  constructor(private http: HttpClient) { }

  sendFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.baseUrl}`, feedback, {
      headers: this.getAuthHeaders()
    });

  }
  getAllFeedbackByUserId(userId: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}/user/${userId}`, {
      headers: this.getAuthHeaders()
    });

  }
  deleteFeedback(feedbackId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${feedbackId}`, {
      headers: this.getAuthHeaders()
    });
  }
  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}`, {
      headers: this.getAuthHeaders()
    });
  }

}

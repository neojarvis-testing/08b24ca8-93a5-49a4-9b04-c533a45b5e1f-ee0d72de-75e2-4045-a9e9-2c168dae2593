import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  feedbackId: string;
  userId: string;
  delPopup: boolean = false;
  feedbackToDel: Feedback | null;

  constructor(private router: Router, private service: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    this.service.getFeedbacks().subscribe((data) => {
      this.feedbacks = data;
    });
  }

  public confirmDelete(feedback: Feedback): void {
    this.feedbackToDel = feedback;
    this.delPopup = true;
  }

  public deleteFeedback(): void {
    if (this.feedbackToDel) {
      this.service.deleteFeedback(String(this.feedbackToDel.FeedbackId)).subscribe(() => {
        this.getFeedbacksByUserId(this.userId);
        this.delPopup = false;
        this.feedbackToDel = null;
      });
    }
  }

  public getFeedbacksByUserId(userId: string): void {
    this.service.getAllFeedbacksByUserId(userId).subscribe((data: Feedback[]) => {
      this.feedbacks = data;
    });
  }

  public closeDel(): void {
    this.delPopup = false;
    this.feedbackToDel = null;
  }
}
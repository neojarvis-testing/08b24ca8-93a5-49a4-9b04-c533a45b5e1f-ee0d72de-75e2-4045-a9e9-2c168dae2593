import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(private router: Router, private service: FeedbackService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userId = String(this.authService.getUserId());
    //this.loadFeedbacks();
    this.getFeedbacksByUserId(this.userId);
  }

  // loadFeedbacks() {
  //   this.service.getFeedbacks().subscribe((data) => {
  //     this.feedbacks = data;
  //   });
  // }

 
  public confirmDelete(feedback: Feedback): void {
    console.log("Feedback to delete:", feedback);
    this.feedbackToDel = feedback;
    this.delPopup = true;
    console.log("Popup state:", this.delPopup);
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
    console.log(userId);
    this.service.getAllFeedbacksByUserId(userId).subscribe((data: Feedback[]) => {
      this.feedbacks = data;
    });
  }

  public closeDel(): void {
    this.delPopup = false;
    this.feedbackToDel = null;
  }
}
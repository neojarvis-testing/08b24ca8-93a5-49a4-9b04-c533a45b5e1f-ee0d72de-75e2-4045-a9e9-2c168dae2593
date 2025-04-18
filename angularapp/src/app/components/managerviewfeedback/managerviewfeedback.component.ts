import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-managerviewfeedback',
  templateUrl: './managerviewfeedback.component.html',
  styleUrls: ['./managerviewfeedback.component.css']
})
export class ManagerviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  showDetailsPopup: boolean = false; 
  selectedUserDetails: any = {}; 

  constructor(private router: Router, private feedbackService: FeedbackService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe((feedbacks: Feedback[]) => {
      const userRequests = feedbacks.map((feedback) =>
        this.authService.getUserById(feedback.UserId)
      );

      forkJoin(userRequests).subscribe((users) => {
        feedbacks.forEach((feedback, index) => {
          feedback.User = users[index];
        });

        this.feedbacks = feedbacks;
        console.log(this.feedbacks);
      });
    });
  }

  showDetails(feedback: Feedback): void {
    this.selectedUserDetails = {
      username: feedback.User?.Username,
      email: feedback.User?.Email,
      mobile: feedback.User?.MobileNumber
    };
    this.showDetailsPopup = true; 
  }

  closeDetailsPopup(): void {
    this.showDetailsPopup = false; 
    this.selectedUserDetails = {}; 
  }
}
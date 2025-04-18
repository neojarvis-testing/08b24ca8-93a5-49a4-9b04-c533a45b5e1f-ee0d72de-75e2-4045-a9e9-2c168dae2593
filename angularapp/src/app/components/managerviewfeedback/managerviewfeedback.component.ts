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
  showDetailsPopup: boolean = false; // Controls the visibility of the popup
  selectedUserDetails: any = {}; // Holds the details of the selected user

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private router: Router, private feedbackService: FeedbackService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe((feedbacks: Feedback[]) => {
      const userRequests = feedbacks.map((feedback) =>
        this.authService.getUserById(feedback.UserId)
      );

      // Fetch users in parallel using forkJoin
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
      username: feedback.User.UserName,
      email: feedback.User.Email,
      mobile: feedback.User.MobileNumber
    };
    this.showDetailsPopup = true;
  }

  closeDetailsPopup(): void {
    this.showDetailsPopup = false; // Hide the popup
    this.selectedUserDetails = {}; // Clear the details
  }

  // Pagination methods
  public get paginatedFeedbacks(): Feedback[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.feedbacks.slice(startIndex, startIndex + this.itemsPerPage);
  }

  public changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  public totalPages(): number {
    return Math.ceil(this.feedbacks.length / this.itemsPerPage);
  }
}
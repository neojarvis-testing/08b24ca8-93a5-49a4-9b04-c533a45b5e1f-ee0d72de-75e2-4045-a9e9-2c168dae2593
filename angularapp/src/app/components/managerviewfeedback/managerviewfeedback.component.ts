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

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;

  // Property to track whether data has been fetched
  dataFetched: boolean = false;

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
        this.dataFetched = true; // Mark data as fetched
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
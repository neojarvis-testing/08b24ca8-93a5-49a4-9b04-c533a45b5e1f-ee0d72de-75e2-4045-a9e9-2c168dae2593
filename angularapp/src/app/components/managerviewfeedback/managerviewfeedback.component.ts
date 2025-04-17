import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
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

  constructor(private router: Router, private service: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  
  loadFeedbacks(): void {
    this.service.getFeedbacks().subscribe((data: Feedback[]) => {
      this.feedbacks = data;
    });
  }

  
  showDetails(): void {
    this.showDetailsPopup=true;
    
  }

  
  closeDetailsPopup(): void {
    this.showDetailsPopup = false; // Hide the popup
    this.selectedUserDetails = {}; // Clear the details
  }
}
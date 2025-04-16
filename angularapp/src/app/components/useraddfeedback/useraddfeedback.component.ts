import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {
  feedback: Feedback = {
    UserId: 2,
    Comments: '',
    DateProvided: new Date()
  }
  showPopup:boolean=false;

  constructor(private router:Router, private service:FeedbackService,private authService:AuthService) { }

  ngOnInit(): void {
    // const userId = this.authService.getUserIdFromToken(this.authService.getToken()!);
    // if (userId) {
    //   this.feedback.UserId = parseInt(userId, 10);
    // }

  }
  onSubmit(feedbackForm: any): void {
    if (!this.feedback.Comments) {
      feedbackForm.form.markAllAsTouched(); // Mark all fields as touched to show validation messages
      return;
    }
    this.service.sendFeedback(this.feedback).subscribe(() => {
      this.showPopup = true;
    });
  }
  closePopup(): void {
    this.showPopup = false;
    this.router.navigate(['/userviewfeedback']); // Redirect to userviewfeedback component
  }


}

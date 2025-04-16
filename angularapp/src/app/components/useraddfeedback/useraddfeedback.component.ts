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
    UserId: 0,
    Comments: '',
    DateProvided: new Date()
  }
  CurrentUser: any;
  showPopup:boolean=false;

  constructor(private router:Router, private feedbackservice:FeedbackService,private authService:AuthService) { }

  ngOnInit(): void {
    this.feedback.UserId = Number(this.authService.getUserId());
  }

  onSubmit(feedbackForm: any): void {
    if (!this.feedback.Comments) {
      feedbackForm.form.markAllAsTouched(); // Mark all fields as touched to show validation messages
      return;
    }
    console.log(this.feedback);
    this.feedbackservice.sendFeedback(this.feedback).subscribe(() => {
      console.log(this.feedback);
      this.showPopup = true;
    });
  }
  closePopup(): void {
    this.showPopup = false;
    this.router.navigate(['/userviewfeedback']); // Redirect to userviewfeedback component
  }


}

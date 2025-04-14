import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {
  newUserFeedback: Feedback = {
    UserId: 0,
    Comments: '',
    DateProvided: undefined
  }

  constructor(private router:Router, private service:FeedbackService) { }

  ngOnInit(): void {

  }
  addUserFeedback(){
    if(this.newUserFeedback.UserId&&this.newUserFeedback.Comments&&this.newUserFeedback.DateProvided){
      this.service.sendFeedback(this.newUserFeedback);
    }
  }


}

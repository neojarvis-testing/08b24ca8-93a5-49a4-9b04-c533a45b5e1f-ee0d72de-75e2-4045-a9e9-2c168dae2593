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
  Feedbacks:Feedback[]=[];

  constructor(private router:Router, private service:FeedbackService) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }
  loadFeedbacks(){
    this.service.getFeedbacks().subscribe(data=>{
      this.Feedbacks=data;
    });
  }

}

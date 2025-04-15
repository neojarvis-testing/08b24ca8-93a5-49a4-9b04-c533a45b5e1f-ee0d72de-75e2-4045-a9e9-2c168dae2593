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
  feedbacks:Feedback[]=[];

  constructor(private router:Router, private service:FeedbackService) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }
  loadFeedbacks(){
    this.service.getFeedbacks().subscribe(data=>{
      this.feedbacks=data;
    });

  }

}

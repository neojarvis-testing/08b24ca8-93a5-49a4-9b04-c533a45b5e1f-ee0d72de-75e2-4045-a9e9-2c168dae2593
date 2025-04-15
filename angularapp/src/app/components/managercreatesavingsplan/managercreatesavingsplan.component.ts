import { Component, OnInit } from '@angular/core';
import { SavingsplanService } from '../../services/savingsplan.service';
import { Router } from '@angular/router';
import { SavingsPlan } from '../../models/savingsplan.model';

@Component({
  selector: 'app-managercreatesavingsplan',
  templateUrl: './managercreatesavingsplan.component.html',
  styleUrls: ['./managercreatesavingsplan.component.css']
})
export class ManagercreatesavingsplanComponent implements OnInit {

  newPlan: SavingsPlan = {
    savingPlanId: 0,
    name: '',
    goalAmount: 0,
    timeFrame: 0,
    riskLevel: 'Low',
    description: '',
    status: ''
  };

  formSubmitted = false;

  constructor(private savingsPlanService: SavingsplanService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // this.savingsPlanService.addSavingsPlan(this.newPlan).subscribe(
    //   response => {
    //     this.formSubmitted = true;
    //     this.router.navigate(['/savingsplans']); // Navigate to the list of savings plans or another appropriate route
    //   },
    //   error => {
    //     console.error('Error adding savings plan:', error);
    //   }
    // );

    this.formSubmitted=true;
    if(this.newPlan.name && this.newPlan.goalAmount && this.newPlan.timeFrame && this.newPlan.riskLevel && this.newPlan.description && this.newPlan.status)
    {
      this.savingsPlanService.addSavingsPlan(this.newPlan).subscribe(()=>{
        this.router.navigate([`/savingsplans`]);

        this.newPlan = {
          savingPlanId: 0,
          name: '',
          goalAmount: 0,
          timeFrame: 0,
          riskLevel: 'Low',
          description: '',
          status: ''
        }
        this.formSubmitted=false;
      });
    }
  }
}

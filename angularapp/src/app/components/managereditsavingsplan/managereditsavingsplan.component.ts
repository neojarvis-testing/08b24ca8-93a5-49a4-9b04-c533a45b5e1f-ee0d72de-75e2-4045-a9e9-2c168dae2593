import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SavingsPlan } from '../../models/savingsplan.model';
import { SavingsplanService } from '../../services/savingsplan.service';

@Component({
  selector: 'app-managereditsavingsplan',
  templateUrl: './managereditsavingsplan.component.html',
  styleUrls: ['./managereditsavingsplan.component.css']
})
export class ManagereditsavingsplanComponent implements OnInit {
  
  savingsPlan: SavingsPlan = {
    SavingPlanId: 0,
    Name: '',
    GoalAmount: null,
    TimeFrame: null,
    RiskLevel: 'Low',
    Description: '',
    Status: ''
  };

  savingPlanId: number = 0;
  formSubmitted = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private savingsPlanService: SavingsplanService
  ) {}

  ngOnInit(): void {
    // Retrieve the savingsPlanId from the route parameters
    this.savingPlanId = +this.route.snapshot.paramMap.get('id');
    if (this.savingPlanId) {
      this.getSavingsPlan(this.savingPlanId);
    } else {
      this.errorMessage = 'Invalid savings plan ID';
    }
  }

  getSavingsPlan(savingPlanId: number): void {
    this.savingsPlanService.getSavingsPlanById(savingPlanId).subscribe({
      next: (data) => {
        this.savingsPlan = data;

        
        this.savingsPlan.SavingPlanId = data.SavingPlanId || savingPlanId;

        console.log(this.savingsPlan); 
      },
      error: () => {
        this.errorMessage = 'Error fetching savings plan details';
      }
    });
  }

  onSubmit(): void {
    console.log(this.savingsPlan); // Debugging
    this.formSubmitted = true;

    if (
      this.savingsPlan.Name &&
      this.savingsPlan.GoalAmount > 0 &&
      this.savingsPlan.TimeFrame > 0 &&
      this.savingsPlan.RiskLevel &&
      this.savingsPlan.Description &&
      this.savingsPlan.Status
    ) {
      if (!this.savingsPlan.SavingPlanId) {
        this.errorMessage = 'Invalid savingPlanId. Cannot update the savings plan.';
        return;
      }

      this.savingsPlanService.updateSavingsPlan(this.savingsPlan.SavingPlanId, this.savingsPlan).subscribe({
        next: () => {
          this.formSubmitted = true;
          setTimeout(() => this.router.navigate(['/Manager/SavingPlans']), 2000);
        },
        error: () => {
          this.errorMessage = 'Error updating savings plan';
        }
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }
}

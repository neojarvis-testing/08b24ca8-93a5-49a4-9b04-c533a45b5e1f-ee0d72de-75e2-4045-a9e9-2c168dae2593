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
    savingPlanId: 0,
    name: '',
    goalAmount: 0,
    timeFrame: 0,
    riskLevel: 'Low',
    description: '',
    status: ''
  };

  savingPlanId:any ={};
  formSubmitted = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private savingsPlanService: SavingsplanService
  ) {}

  ngOnInit(): void {
    // Retrieve the savingsPlanId from the route parameters
    this.savingPlanId = +this.route.snapshot.paramMap.get('savingsPlanId')!;
    if (this.savingPlanId) {
      this.getSavingsPlan();
    } else {
      this.errorMessage = 'Invalid savings plan ID';
    }
  }

  getSavingsPlan(): void {
    this.savingsPlanService.getSavingsPlanById(this.savingPlanId.toString()).subscribe({
      next: (data) => {
        this.savingsPlan = data;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching savings plan details';
      }
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;

    // Validate required fields
    if (
      this.savingsPlan.name &&
      this.savingsPlan.goalAmount > 0 &&
      this.savingsPlan.timeFrame > 0 &&
      this.savingsPlan.riskLevel &&
      this.savingsPlan.description &&
      this.savingsPlan.status
    ) {
      this.savingsPlanService.updateSavingsPlan(this.savingPlanId.toString(), this.savingsPlan).subscribe({
        next: () => {
          this.formSubmitted = true;
          setTimeout(() => this.router.navigate(['/savingsplans']), 2000); // Redirect after success
        },
        error: (err) => {
          this.errorMessage = 'Error updating savings plan';
        }
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }
}

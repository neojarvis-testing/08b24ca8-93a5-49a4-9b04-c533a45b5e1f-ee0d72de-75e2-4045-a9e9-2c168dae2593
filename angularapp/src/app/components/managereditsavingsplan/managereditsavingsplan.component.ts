// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-managereditsavingsplan',
//   templateUrl: './managereditsavingsplan.component.html',
//   styleUrls: ['./managereditsavingsplan.component.css']
// })
// export class ManagereditsavingsplanComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

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

  filterdata:
  formSubmitted = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  private savingsPlanService:SavingsplanService
  ) {}

  ngOnInit(): void {
    // Retrieve the savingsPlanId from the route parameters
    this.savingsPlanId = +this.route.snapshot.paramMap.get('savingsPlanId')!;
    this.getSavingsPlan();
  }

  getSavingsPlan(): void {
    this.savingsPlanService.getAllSavingsPlans(this.savingsPlanId).subscribe({
      next: (data) => {
        this.savingsPlan = data;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching savings plan details';
      }
    });
  }

  onSubmit(): void {
    this.savingsPlanService.updateSavingsPlan(this.savingsPlanId, this.savingsPlan).subscribe({
      next: () => {
        this.formSubmitted = true;
        setTimeout(() => this.router.navigate(['/savingsplans']), 2000); // Redirect after success
      },
      error: (err) => {
        this.errorMessage = 'Error updating savings plan';
      }
    });
  }
}
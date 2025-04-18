import { Component, OnInit } from '@angular/core';
import { SavingsplanService } from '../../services/savingsplan.service';
import { Router } from '@angular/router';
import { SavingsPlan } from '../../models/savingsplan.model';

@Component({
  selector: 'app-managerviewsavingsplan',
  templateUrl: './managerviewsavingsplan.component.html',
  styleUrls: ['./managerviewsavingsplan.component.css']
})
export class ManagerviewsavingsplanComponent implements OnInit {

  savingsPlans: SavingsPlan[] = [];

  constructor(private savingsPlanService: SavingsplanService, private router: Router) { }

  ngOnInit(): void {
    this.loadSavingsPlans();
  }

  loadSavingsPlans(): void {
    this.savingsPlanService.getAllSavingsPlans().subscribe(
      data => {
        this.savingsPlans = data;
        console.log(this.savingsPlans); // Log the data to verify it's being fetched correctly
      },
      // error => {
      //   console.error('Error fetching savings plans:', error);
      // }
    );
  }

  deleteSavingsPlan(savingsPlanId: number): void {
    this.savingsPlanService.deleteSavingsPlan(savingsPlanId).subscribe(
      () => {
        this.loadSavingsPlans(); // Reload the list after deletion
      },
      error => {
        console.error('Error deleting savings plan:', error);
      }
    );
  }

  editSavingsPlan(id: number): void {
    this.router.navigate([`/Manager/EditSavingPlan/${id}`])
  }
}




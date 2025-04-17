import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanApplication } from 'src/app/models/planapplication.model';
import { SavingsPlan } from 'src/app/models/savingsplan.model';
import { AuthService } from 'src/app/services/auth.service';
import { PlanapplicationformService } from 'src/app/services/planapplicationform.service';
import { SavingsplanService } from 'src/app/services/savingsplan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userappliedplans',
  templateUrl: './userappliedplans.component.html',
  styleUrls: ['./userappliedplans.component.css']
})
export class UserappliedplansComponent implements OnInit {
  planApplications: PlanApplication[] = [];
  savingsplans: SavingsPlan[]= [];
  selectedImage: string | null = null;
  userID: number = 0;

  constructor(
    private planApplicationService: PlanapplicationformService,
    private savingsPlanService: SavingsplanService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userID = this.authService.getUserId();
    this.loadAppliedPlans();
  }

  loadAppliedPlans(): void {
    this.planApplicationService.getAppliedPlans(this.userID).subscribe(data => {
      this.planApplications = data;
    });

    this.savingsPlanService.getAllSavingsPlans().subscribe(data => {
        this.savingsplans = data;
    });
  }

  sortAmountAscending(): void {
    this.planApplications.sort((a, b) => a.AppliedAmount - b.AppliedAmount);
  }

  sortAmountDescending(): void {
    this.planApplications.sort((a, b) => b.AppliedAmount - a.AppliedAmount);
  }

  deletePlanApplication(planApplicationId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this plan application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(result => {
      if (result.isConfirmed) {
        this.planApplicationService.deletePlanApplication(planApplicationId).subscribe(() => {
          Swal.fire('Deleted!', 'Plan application has been deleted.', 'success');
          this.planApplications = this.planApplications.filter(
            app => app.PlanApplicationId !== planApplicationId
          );
        });
      }
    });
  }

  viewImage(proofDocument: string): void {
    this.selectedImage = proofDocument;
  }

  closeModal(): void {
    this.selectedImage = null;
  }
}
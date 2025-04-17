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
  originalPlanApplications: PlanApplication[] = []; // Keep a copy of the original order
  selectedImage: string | null = null;
  currentUser: any = null;
  userID: number = 0;

  // Sort orders for different columns
  sortPlanNameOrder: 'asc' | 'desc' | null = null;
  sortAppliedAmountOrder: 'asc' | 'desc' | null = null;
  sortApplicationDateOrder: 'asc' | 'desc' | null = null;
  sortStatusOrder: 'asc' | 'desc' | null = null;

  constructor(
    private planApplicationService: PlanapplicationformService,
    private savingsPlanService: SavingsplanService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    this.userID = this.currentUser.userId;
    this.loadAppliedPlans();
  }

  loadAppliedPlans(): void {
    this.planApplicationService.getAppliedPlans(this.userID).subscribe(data => {
      this.planApplications = data;
      this.originalPlanApplications = [...data];
    });

    this.savingsPlanService.getAllSavingsPlans().subscribe(data => {
      this.savingsplans = data;
    });
  }

  // Sorting for Plan Name column
  sortPlanName(): void {
    if (this.sortPlanNameOrder === 'asc') {
      this.planApplications.sort((a, b) =>
        this.savingsplans[b.SavingsPlanId]?.Name.localeCompare(this.savingsplans[a.SavingsPlanId]?.Name)
      );
      this.sortPlanNameOrder = 'desc';
    } else if (this.sortPlanNameOrder === 'desc') {
      this.resetSorting();
    } else {
      this.planApplications.sort((a, b) =>
        this.savingsplans[a.SavingsPlanId]?.Name.localeCompare(this.savingsplans[b.SavingsPlanId]?.Name)
      );
      this.sortPlanNameOrder = 'asc';
    }
  }

  // Sorting for Applied Amount column
  sortAppliedAmount(): void {
    if (this.sortAppliedAmountOrder === 'asc') {
      this.planApplications.sort((a, b) => b.AppliedAmount - a.AppliedAmount);
      this.sortAppliedAmountOrder = 'desc';
    } else if (this.sortAppliedAmountOrder === 'desc') {
      this.resetSorting();
    } else {
      this.planApplications.sort((a, b) => a.AppliedAmount - b.AppliedAmount);
      this.sortAppliedAmountOrder = 'asc';
    }
  }

  // Sorting for Application Date column
  sortApplicationDate(): void {
    if (this.sortApplicationDateOrder === 'asc') {
      this.planApplications.sort((a, b) =>
        new Date(b.ApplicationDate).getTime() - new Date(a.ApplicationDate).getTime()
      );
      this.sortApplicationDateOrder = 'desc';
    } else if (this.sortApplicationDateOrder === 'desc') {
      this.resetSorting();
    } else {
      this.planApplications.sort((a, b) =>
        new Date(a.ApplicationDate).getTime() - new Date(b.ApplicationDate).getTime()
      );
      this.sortApplicationDateOrder = 'asc';
    }
  }

  // Sorting for Status column
  sortStatus(): void {
    if (this.sortStatusOrder === 'asc') {
      this.planApplications.sort((a, b) =>
        b.Status.localeCompare(a.Status)
      );
      this.sortStatusOrder = 'desc';
    } else if (this.sortStatusOrder === 'desc') {
      this.resetSorting();
    } else {
      this.planApplications.sort((a, b) =>
        a.Status.localeCompare(b.Status)
      );
      this.sortStatusOrder = 'asc';
    }
  }

  resetSorting(): void {
    this.planApplications = [...this.originalPlanApplications];
    this.sortPlanNameOrder = null;
    this.sortAppliedAmountOrder = null;
    this.sortApplicationDateOrder = null;
    this.sortStatusOrder = null;
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
          this.originalPlanApplications = this.originalPlanApplications.filter(
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
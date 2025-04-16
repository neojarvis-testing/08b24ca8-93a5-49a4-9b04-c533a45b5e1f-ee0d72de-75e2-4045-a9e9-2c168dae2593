import { Component, OnInit } from '@angular/core';
import { PlanApplication } from 'src/app/models/planapplication.model';
import { PlanapplicationformService } from 'src/app/services/planapplicationform.service';
import { SavingsPlan } from 'src/app/models/savingsplan.model';

@Component({
  selector: 'app-managerviewapplicationform',
  templateUrl: './managerviewapplicationform.component.html',
  styleUrls: ['./managerviewapplicationform.component.css']
})
export class ManagerviewapplicationformComponent implements OnInit {

  planApplications: PlanApplication[] = [];
  filteredPlanApplications: PlanApplication[] = [];
  searchPlanName: string = '';
  newStatus: string = '';
  popupImageSrc: string = '';
  showPopup: boolean = false;

  constructor(private planApplicationformService: PlanapplicationformService) { }

  ngOnInit(): void {
    this.getAllPlanApplications();
  }

  getAllPlanApplications() {
    this.planApplicationformService.getAllPlanApplications().subscribe((data) => {
      this.planApplications = data.map(application => ({
        ...application,
        SavingsPlan: application.SavingsPlan || {} as SavingsPlan
      }));
      this.filteredPlanApplications = [...this.planApplications];
    });
  }

  sortAmountAscending() {
    this.filteredPlanApplications = [...this.filteredPlanApplications.sort((a, b) => a.AppliedAmount - b.AppliedAmount)];
  }

  sortAmountDescending() {
    this.filteredPlanApplications = [...this.filteredPlanApplications.sort((a, b) => b.AppliedAmount - a.AppliedAmount)];
  }

  filterApplicationsByPlanName() {
    if (this.searchPlanName.trim()) {
      this.filteredPlanApplications = this.planApplications.filter(app => 
        app.SavingsPlan?.name?.toLowerCase().includes(this.searchPlanName.toLowerCase())
      );
    } else {
      this.filteredPlanApplications = [...this.planApplications];
    }
  }

  approve(planApplication: PlanApplication) {
    console.log(planApplication)
    console.log(planApplication.PlanApplicationId)
    if (planApplication.status === 'Pending') {
      planApplication.status = 'Approved';
      console.log(planApplication);
      this.planApplicationformService.updatePlanApplication(planApplication.PlanApplicationId, planApplication).subscribe(() => {
        this.getAllPlanApplications();
      });
    }
  }

  reject(planApplication: PlanApplication) {
    if (planApplication.status === 'Pending') {
      planApplication.status = 'Rejected';
      this.planApplicationformService.updatePlanApplication(planApplication.PlanApplicationId, planApplication).subscribe(() => {
        this.getAllPlanApplications();
      });
    }
  }
}
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

  constructor(private planApplicationformService: PlanapplicationformService) { }
  newStatus: string;
  planApplications: PlanApplication[] = [];
  filteredPlanApplications: PlanApplication[] = [];
  searchPlanName: string = '';


  ngOnInit(): void {
    this.getAllPlanApplications();
  }

  getAllPlanApplications() {
    this.planApplicationformService.getAllPlanApplications().subscribe((data) => {
      this.planApplications = data.map(application => ({
        ...application,
        SavingsPlan: application.SavingsPlan || {} as SavingsPlan // Ensure SavingsPlan is defined
      }));
      this.filteredPlanApplications = [...this.planApplications];
      console.log("getall in comp ", this.filteredPlanApplications);
    });
  }

  sortAmountAscending() {
    this.filteredPlanApplications = [...this.filteredPlanApplications.sort((a, b) => a.AppliedAmount - b.AppliedAmount)];
  }

  sortAmountDescending() {
    this.filteredPlanApplications = [...this.filteredPlanApplications.sort((a, b) => b.AppliedAmount - a.AppliedAmount)];
  }

  // filterApplicationsByPlanName() {
  //   if (this.searchPlanName.trim()) {
  //     this.filteredPlanApplications = this.planApplications.filter(app => app.SavingsPlan?.name?.toLowerCase().includes(this.searchPlanName.toLowerCase()));
  //   } else {
  //     this.filteredPlanApplications = [...this.planApplications];
  //   }
  // }

  status: boolean;
  
  approve(planApplication: PlanApplication) {
    if (planApplication.status === 'Pending') {
      planApplication.status = 'Approved';
      console.log(planApplication.status);
      this.planApplicationformService.updatePlanApplication(planApplication.PlanApplicationId, planApplication).subscribe((data: any) => {
        this.getAllPlanApplications();
        this.newStatus = planApplication.status;
      });
    }
  }

  reject(planApplication: PlanApplication) {
    if (planApplication.status === 'Pending') {
      planApplication.status = 'Rejected';
      console.log(planApplication.status);
      this.planApplicationformService.updatePlanApplication(planApplication.PlanApplicationId, planApplication).subscribe((data: any) => {
        this.getAllPlanApplications();
        this.newStatus = planApplication.status;
      });
    }
  }



}

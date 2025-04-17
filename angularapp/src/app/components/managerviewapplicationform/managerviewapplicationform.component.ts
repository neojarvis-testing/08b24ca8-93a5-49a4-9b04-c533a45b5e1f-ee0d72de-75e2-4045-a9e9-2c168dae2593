// // import { Component, OnInit } from '@angular/core';
// // import { PlanApplication } from 'src/app/models/planapplication.model';
// // import { PlanapplicationformService } from 'src/app/services/planapplicationform.service';
// // import { SavingsPlan } from 'src/app/models/savingsplan.model';

// // @Component({
// //   selector: 'app-managerviewapplicationform',
// //   templateUrl: './managerviewapplicationform.component.html',
// //   styleUrls: ['./managerviewapplicationform.component.css']
// // })
// // export class ManagerviewapplicationformComponent implements OnInit {

// //   planApplications: PlanApplication[] = [];
// //   filteredPlanApplications: PlanApplication[] = [];
// //   searchPlanName: string = '';
// //   popupImageSrc: string = '';
// //   showPopup: boolean = false;

// //   constructor(private planApplicationformService: PlanapplicationformService) { }

// //   ngOnInit(): void {
// //     this.getAllPlanApplications();
// //   }

// //   getAllPlanApplications() {
// //     this.planApplicationformService.getAllPlanApplications().subscribe((data) => {
// //       this.planApplications = data;
// //       this.filteredPlanApplications = [...this.planApplications];
// //     });
// //   }

// //   sortAmountAscending() {
// //     this.filteredPlanApplications = [...this.filteredPlanApplications.sort((a, b) => a.AppliedAmount - b.AppliedAmount)];
// //   }

// //   sortAmountDescending() {
// //     this.filteredPlanApplications = [...this.filteredPlanApplications.sort((a, b) => b.AppliedAmount - a.AppliedAmount)];
// //   }

// //   filterApplicationsByPlanName() {
// //     if (this.searchPlanName.trim()) {
// //       this.filteredPlanApplications = this.planApplications.filter(app => 
// //         app.SavingsPlan?.Name?.toLowerCase().includes(this.searchPlanName.toLowerCase())
// //       );
// //     } else {
// //       this.filteredPlanApplications = [...this.planApplications];
// //     }
// //   }

// //   approve(planApplication: PlanApplication) {
// //     if (planApplication.Status === 'Pending') {
// //       const updatedApplication = { ...planApplication, Status: 'Approved' }; // Update the status
// //       this.planApplicationformService.updatePlanApplication(updatedApplication.PlanApplicationId, updatedApplication).subscribe(() => {
// //         this.getAllPlanApplications();
// //       });
// //     }
// //   }

// //   reject(planApplication: PlanApplication) {
// //     if (planApplication.Status === 'Pending') {
// //       const updatedApplication = { ...planApplication, Status: 'Rejected' }; // Update the status
// //       this.planApplicationformService.updatePlanApplication(updatedApplication.PlanApplicationId, updatedApplication).subscribe(() => {
// //         this.getAllPlanApplications();
// //       });
// //     }
// //   }
// // }

// import { Component, OnInit } from '@angular/core';
// import { PlanApplication } from 'src/app/models/planapplication.model';
// import { PlanapplicationformService } from 'src/app/services/planapplicationform.service';
// import { SavingsplanService } from 'src/app/services/savingsplan.service';
// import { SavingsPlan } from 'src/app/models/savingsplan.model';
// import { AuthService } from 'src/app/services/auth.service';
// import { User } from 'src/app/models/user.model';

// @Component({
//   selector: 'app-managerviewapplicationform',
//   templateUrl: './managerviewapplicationform.component.html',
//   styleUrls: ['./managerviewapplicationform.component.css']
// })
// export class ManagerviewapplicationformComponent implements OnInit {

//   planApplications: PlanApplication[] = [];
//   filteredPlanApplications: PlanApplication[] = [];
//   searchPlanName: string = '';
//   popupImageSrc: string = '';
//   showPopup: boolean = false;

//   constructor(
//     private planApplicationformService: PlanapplicationformService,
//     private savingsPlanService: SavingsplanService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.getAllPlanApplications();
//   }

//   // Fetch all plan applications and map user and plan details
//   getAllPlanApplications() {
//     this.planApplicationformService.getAllPlanApplications().subscribe((data) => {
//       this.planApplications = data;
//       this.planApplications.forEach((application) => {
//         // Fetch associated user details
//         this.authService.getUserById(application.UserId).subscribe((user: User) => {
//           application.User = user;
//         });

//         // Fetch associated savings plan details
//         this.savingsPlanService.getSavingsPlanById(application.SavingsPlanId).subscribe((plan: SavingsPlan) => {
//           application.SavingsPlan = plan;
//         });
//       });

//       // Initialize filtered applications
//       this.filteredPlanApplications = [...this.planApplications];
//     });
//   }

//   // Sort applications by applied amount in ascending order
//   sortAmountAscending() {
//     this.filteredPlanApplications = [...this.filteredPlanApplications.sort((a, b) => a.AppliedAmount - b.AppliedAmount)];
//   }

//   // Sort applications by applied amount in descending order
//   sortAmountDescending() {
//     this.filteredPlanApplications = [...this.filteredPlanApplications.sort((a, b) => b.AppliedAmount - a.AppliedAmount)];
//   }

//   // Filter applications by plan name
//   filterApplicationsByPlanName() {
//     if (this.searchPlanName.trim()) {
//       this.filteredPlanApplications = this.planApplications.filter(app => 
//         app.SavingsPlan?.Name?.toLowerCase().includes(this.searchPlanName.toLowerCase())
//       );
//     } else {
//       this.filteredPlanApplications = [...this.planApplications];
//     }
//   }

//   // Approve a pending application
//   approve(planApplication: PlanApplication) {
//     if (planApplication.Status === 'Pending') {
//       const updatedApplication = { ...planApplication, Status: 'Approved' };
//       this.planApplicationformService.updatePlanApplication(updatedApplication.PlanApplicationId, updatedApplication).subscribe(() => {
//         planApplication.Status = 'Approved'; // Update status directly after success
//       });
//     }
//   }

//   // Reject a pending application
//   reject(planApplication: PlanApplication) {
//     if (planApplication.Status === 'Pending') {
//       const updatedApplication = { ...planApplication, Status: 'Rejected' };
//       this.planApplicationformService.updatePlanApplication(updatedApplication.PlanApplicationId, updatedApplication).subscribe(() => {
//         planApplication.Status = 'Rejected'; // Update status directly after success
//       });
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PlanApplication } from 'src/app/models/planapplication.model';
import { PlanapplicationformService } from 'src/app/services/planapplicationform.service';
import { SavingsplanService } from 'src/app/services/savingsplan.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
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
  popupImageSrc: string = '';
  showPopup: boolean = false;

  constructor(
    private planApplicationformService: PlanapplicationformService,
    private savingsPlanService: SavingsplanService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllPlanApplications();
  }

  // Fetch all plan applications and load details in parallel
  getAllPlanApplications() {
    this.planApplicationformService.getAllPlanApplications().subscribe((applications: PlanApplication[]) => {
      const userRequests = applications.map((application) =>
        this.authService.getUserById(application.UserId)
      );
      const planRequests = applications.map((application) =>
        this.savingsPlanService.getSavingsPlanById(application.SavingsPlanId)
      );

      // Fetch users and plans in parallel using forkJoin
      forkJoin([forkJoin(userRequests), forkJoin(planRequests)]).subscribe(([users, plans]) => {
        applications.forEach((application, index) => {
          application.User = users[index];
          application.SavingsPlan = plans[index];
        });

        this.planApplications = applications;
        this.filteredPlanApplications = [...this.planApplications];
      });
    });
  }

  // Sort applications by applied amount in ascending order
  sortAmountAscending() {
    this.filteredPlanApplications = [...this.filteredPlanApplications.sort((a, b) => a.AppliedAmount - b.AppliedAmount)];
  }

  // Sort applications by applied amount in descending order
  sortAmountDescending() {
    this.filteredPlanApplications = [...this.filteredPlanApplications.sort((a, b) => b.AppliedAmount - a.AppliedAmount)];
  }

  // Filter applications by plan name
  filterApplicationsByPlanName() {
    if (this.searchPlanName.trim()) {
      this.filteredPlanApplications = this.planApplications.filter(app => 
        app.SavingsPlan?.Name?.toLowerCase().includes(this.searchPlanName.toLowerCase())
      );
    } else {
      this.filteredPlanApplications = [...this.planApplications];
    }
  }

  // Approve a pending application
  approve(planApplication: PlanApplication) {
    if (planApplication.Status === 'Pending') {
      const updatedApplication = { ...planApplication, Status: 'Approved' };
      this.planApplicationformService.updatePlanApplication(updatedApplication.PlanApplicationId, updatedApplication).subscribe(() => {
        planApplication.Status = 'Approved'; // Update status directly after success
      });
    }
  }

  // Reject a pending application
  reject(planApplication: PlanApplication) {
    if (planApplication.Status === 'Pending') {
      const updatedApplication = { ...planApplication, Status: 'Rejected' };
      this.planApplicationformService.updatePlanApplication(updatedApplication.PlanApplicationId, updatedApplication).subscribe(() => {
        planApplication.Status = 'Rejected'; // Update status directly after success
      });
    }
  }
}
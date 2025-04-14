// import { Component, OnInit } from '@angular/core';

// import { Router } from '@angular/router';
// import { PlanApplication } from 'src/app/models/planapplication.model';
// import { PlanapplicationformService } from 'src/app/services/planapplicationform.service';

// @Component({
//   selector: 'app-user-applied-plans',
//   templateUrl: './userappliedplans.component.html',
//   styleUrls: ['./userappliedplans.component.css']
// })
// export class UserAppliedPlansComponent implements OnInit {
//   planApplications: PlanApplication[] = [];
//   userId: number = 1; // Replace with the actual user ID

//   constructor(private planApplicationService: PlanapplicationformService, private router: Router) { }

//   ngOnInit(): void {
//     this.loadAppliedPlans();
//   }

//   loadAppliedPlans(): void {
//     this.planApplicationService.getAppliedPlans(this.userId).subscribe(data => {
//       this.planApplications = data;
//     });
//   }

//   deletePlanApplication(planApplicationId: number): void {
//     this.router.navigate([`/confirmDelete/${planApplicationId}`]);
//   }
// }

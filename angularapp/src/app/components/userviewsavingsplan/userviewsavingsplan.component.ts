// import { Component, OnInit } from '@angular/core';
// import { SavingsplanService } from 'src/app/services/savingsplan.service';
// import { Router } from '@angular/router';
// import { PlanApplication } from 'src/app/models/planapplication.model';
// import { SavingsPlan } from 'src/app/models/savingsplan.model';

// @Component({
//   selector: 'app-userviewsavingsplan',
//   templateUrl: './userviewsavingsplan.component.html',
//   styleUrls: ['./userviewsavingsplan.component.css']
// })
// export class UserviewsavingsplanComponent implements OnInit {
  
//   plans:SavingsPlan[]=[];
//   searchTerm: any;

//   constructor(public savingplanservice:SavingsplanService,private router:Router) { }
//   ngOnInit(): void {
//     this.viewPlan(); 
//   }

//   viewPlan():void{
//     this.savingplanservice.getAllSavingsPlans().subscribe(data=>this.plans=data)
//   }

//   filterPlans(): void {
//        this.searchTerm = this.plans.filter(plan => 
//        plan.name.toLowerCase().includes(this.searchTerm.toLowerCase())
//        );
//         }
  
// }
  
  
// // plans = [
// //    { name: 'Plan A', status: 'Active', applied: false },
// //    { name: 'Plan B', status: 'Inactive', applied: false },
// //    { name: 'Plan C', status: 'Active', applied: true }
// //    ];
// //    searchTerm = '';
// //    filteredPlans = this.plans;
  
// //    ngOnInit(): void {
// //    this.filterPlans();
// //    }
  
// //    filterPlans(): void {
// //    this.filteredPlans = this.plans.filter(plan => 
// //    plan.name.toLowerCase().includes(this.searchTerm.toLowerCase())
// //    );
// //    }
  
// //    applyForPlan(plan: any): void {
// //    // Logic to apply for the plan
// //    plan.applied = true;
// //    alert(`Applied for ${plan.name}`);
// //    }
// //   }
  




import { Component, OnInit } from '@angular/core';
import { SavingsplanService } from 'src/app/services/savingsplan.service';
import { Router } from '@angular/router';
import { SavingsPlan } from 'src/app/models/savingsplan.model';
import { PlanapplicationformService } from 'src/app/services/planapplicationform.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userviewsavingsplan',
  templateUrl: './userviewsavingsplan.component.html',
  styleUrls: ['./userviewsavingsplan.component.css']
})
export class UserviewsavingsplanComponent implements OnInit {
  
  plans: SavingsPlan[] = [];
  filteredPlans: SavingsPlan[] = [];
  searchTerm: string = '';
  currentUser: any = null;


  constructor(private authService: AuthService, private savingPlanService: SavingsplanService, private planApplicationService: PlanapplicationformService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    this.viewPlan(); 
  }

  viewPlan(): void {
    this.savingPlanService.getAllSavingsPlans().subscribe(data => {
      this.plans = data;
      this.filteredPlans = data;
      console.log(data);
    });
  }
  
  filterPlans(): void {
    this.filteredPlans = this.plans.filter(plan => 
      plan.Name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  alreadyApplied(savingsId: number)
  {
    this.planApplicationService.getAppliedPlans(this.currentUser.UserId).subscribe(data => {
      this.appliedPlans = data;
      console.log('Applied Plans:', data);
    });

  }

}
 



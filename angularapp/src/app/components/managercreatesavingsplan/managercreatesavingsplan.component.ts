// import { Component, OnInit } from '@angular/core';
// import { SavingsplanService } from '../../services/savingsplan.service';
// import { SavingsPlan } from '../../models/savingsplan.model';

// @Component({
//   selector: 'app-managercreatesavingsplan',
//   templateUrl: './managercreatesavingsplan.component.html',
//   styleUrls: ['./managercreatesavingsplan.component.css']
// })
// export class ManagercreatesavingsplanComponent implements OnInit {

//   newPlan: SavingsPlan = {
//     savingPlanId: 0,
//     name: '',
//     goalAmount: 0,
//     timeFrame: 0,
//     riskLevel: 'Low',
//     description: '',
//     status: ''
//   };

//   formSubmitted = false;

//   constructor(private savingsPlanService: SavingsplanService) { }

//   ngOnInit(): void {
//   }

//   onSubmit(): void {
//     this.formSubmitted = true;
//     if (this.newPlan.name && this.newPlan.goalAmount && this.newPlan.timeFrame && this.newPlan.riskLevel && this.newPlan.description && this.newPlan.status) {
//       this.savingsPlanService.addSavingsPlan(this.newPlan).subscribe(
//         () => {
//           this.newPlan = {
//             savingPlanId: 0,
//             name: '',
//             goalAmount: 0,
//             timeFrame: 0,
//             riskLevel: 'Low',
//             description: '',
//             status: ''
//           };
//           this.formSubmitted = false;
//         },
//         error => {
//           console.error('Error adding savings plan:', error);
//         }
//       );
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { SavingsplanService } from '../../services/savingsplan.service';
import { SavingsPlan } from '../../models/savingsplan.model';

@Component({
  selector: 'app-managercreatesavingsplan',
  templateUrl: './managercreatesavingsplan.component.html',
  styleUrls: ['./managercreatesavingsplan.component.css']
})
export class ManagercreatesavingsplanComponent implements OnInit {

  newPlan: SavingsPlan = {
    savingPlanId: 0,
    name: '',
    goalAmount: 0,
    timeFrame: 0,
    riskLevel: 'Low',
    description: '',
    status: ''
  };
 as:boolean= false;
  formSubmitted = false;

  constructor(private savingsPlanService: SavingsplanService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.newPlan.name && this.newPlan.goalAmount >= 1000 && this.newPlan.goalAmount <= 10000000 && this.newPlan.timeFrame >= 1 && this.newPlan.timeFrame <= 50 && this.newPlan.riskLevel && this.newPlan.description && this.newPlan.status) {
      this.savingsPlanService.addSavingsPlan(this.newPlan).subscribe(
        () => {
          this.newPlan = {
            savingPlanId: 0,
            name: '',
            goalAmount: 0,
            timeFrame: 0,
            riskLevel: 'Low',
            description: '',
            status: ''
          };
          this.formSubmitted = false;
        },
        error => {
          console.error('Error adding savings plan:', error);
        }
      );
    }
  }
}

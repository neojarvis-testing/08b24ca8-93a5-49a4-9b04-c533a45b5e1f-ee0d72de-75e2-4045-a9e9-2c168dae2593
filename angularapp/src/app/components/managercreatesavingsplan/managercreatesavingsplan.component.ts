// // import { Component, OnInit } from '@angular/core';
// // import { SavingsplanService } from '../../services/savingsplan.service';
// // import { SavingsPlan } from '../../models/savingsplan.model';

// // @Component({
// //   selector: 'app-managercreatesavingsplan',
// //   templateUrl: './managercreatesavingsplan.component.html',
// //   styleUrls: ['./managercreatesavingsplan.component.css']
// // })
// // export class ManagercreatesavingsplanComponent implements OnInit {

// //   newPlan: SavingsPlan = {
// //     savingPlanId: 0,
// //     name: '',
// //     goalAmount: 0,
// //     timeFrame: 0,
// //     riskLevel: 'Low',
// //     description: '',
// //     status: ''
// //   };

// //   formSubmitted = false;

// //   constructor(private savingsPlanService: SavingsplanService) { }

// //   ngOnInit(): void {
// //   }

// //   onSubmit(): void {
// //     this.formSubmitted = true;
// //     if (this.newPlan.name && this.newPlan.goalAmount && this.newPlan.timeFrame && this.newPlan.riskLevel && this.newPlan.description && this.newPlan.status) {
// //       this.savingsPlanService.addSavingsPlan(this.newPlan).subscribe(
// //         () => {
// //           this.newPlan = {
// //             savingPlanId: 0,
// //             name: '',
// //             goalAmount: 0,
// //             timeFrame: 0,
// //             riskLevel: 'Low',
// //             description: '',
// //             status: ''
// //           };
// //           this.formSubmitted = false;
// //         },
// //         error => {
// //           console.error('Error adding savings plan:', error);
// //         }
// //       );
// //     }
// //   }
// // }


// import { Component, OnInit } from '@angular/core';
// import { SavingsplanService } from '../../services/savingsplan.service';
// import { SavingsPlan } from '../../models/savingsplan.model';
// import { Router } from '@angular/router';
// declare var bootstrap: any;

// @Component({
//   selector: 'app-managercreatesavingsplan',
//   templateUrl: './managercreatesavingsplan.component.html',
//   styleUrls: ['./managercreatesavingsplan.component.css']
// })
// export class ManagercreatesavingsplanComponent implements OnInit {

//   newPlan: SavingsPlan = {
//     SavingPlanId: 0,
//     Name: '',
//     GoalAmount: null,
//     TimeFrame: null,
//     RiskLevel: 'Low',
//     Description: '',
//     Status: ''
//   };
//  as:boolean= false;
//   formSubmitted = false;

//   constructor(private savingsPlanService: SavingsplanService, private router:Router) { }

//   ngOnInit(): void {
//   }

//   onSubmit(): void {
//     this.formSubmitted = true;
//     if (this.newPlan.Name && this.newPlan.GoalAmount >= 1000 && this.newPlan.GoalAmount <= 10000000 && this.newPlan.TimeFrame >= 1 && this.newPlan.TimeFrame <= 50 && this.newPlan.RiskLevel && this.newPlan.Description && this.newPlan.Status) {
//       this.savingsPlanService.addSavingsPlan(this.newPlan).subscribe(
//         () => {
//           this.showSuccessModal();
//           this.newPlan = {
//             SavingPlanId: 0,
//             Name: '',
//             GoalAmount: null,
//             TimeFrame: null,
//             RiskLevel: 'Low',
//             Description: '',
//             Status: ''
//           };
//           this.formSubmitted = false;
//         },
//         error => {
//           console.error('Error adding savings plan:', error);
//         }
//       );
//     }
//   }
//   showSuccessModal() {
//     var myModal = new bootstrap.Modal(document.getElementById('successModal'));
//     myModal.show();
//   }
 
//   closeModal() {
//     var myModal = bootstrap.Modal.getInstance(document.getElementById('successModal'));
//     myModal.hide();
//     this.router.navigate([`/Manager/ViewSavings`]);
//   }
 

// }
import { Component, OnInit } from '@angular/core';
import { SavingsplanService } from '../../services/savingsplan.service';
import { SavingsPlan } from '../../models/savingsplan.model';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-managercreatesavingsplan',
  templateUrl: './managercreatesavingsplan.component.html',
  styleUrls: ['./managercreatesavingsplan.component.css']
})
export class ManagercreatesavingsplanComponent implements OnInit {

  newPlan: SavingsPlan = {
    SavingPlanId: 0,
    Name: '',
    GoalAmount: null,
    TimeFrame: null,
    RiskLevel: 'Low',
    Description: '',
    Status: ''
  };
  as: boolean = false;
  formSubmitted = false;

  // Letters for the animation
  letters = ['E', 'D', 'I', 'T'];
  animatedLetters: string[] = []; // To store the letters as they appear

  constructor(private savingsPlanService: SavingsplanService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.newPlan.Name && this.newPlan.GoalAmount >= 1000 && this.newPlan.GoalAmount <= 10000000 && this.newPlan.TimeFrame >= 1 && this.newPlan.TimeFrame <= 50 && this.newPlan.RiskLevel && this.newPlan.Description && this.newPlan.Status) {
      this.savingsPlanService.addSavingsPlan(this.newPlan).subscribe(
        () => {
          this.showSuccessModal();
          this.newPlan = {
            SavingPlanId: 0,
            Name: '',
            GoalAmount: null,
            TimeFrame: null,
            RiskLevel: 'Low',
            Description: '',
            Status: ''
          };
          this.formSubmitted = false;
        },
        error => {
          console.error('Error adding savings plan:', error);
        }
      );
    }
  }

  // Method to show success modal
  showSuccessModal() {
    var myModal = new bootstrap.Modal(document.getElementById('successModal'));
    myModal.show();
  }

  // Method to close the modal and navigate
  closeModal() {
    var myModal = bootstrap.Modal.getInstance(document.getElementById('successModal'));
    myModal.hide();
    this.router.navigate([`/Manager/SavingPlans`]);
  }

  // Method to trigger the animation for the "Edit" button
  animateEdit() {
    this.animatedLetters = []; // Reset the animated letters
    this.letters.forEach((letter, index) => {
      setTimeout(() => {
        this.animatedLetters.push(letter); // Add letters one by one
      }, index * 300); // Delay of 300ms between each letter
    });
  }
}
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { PlanApplication } from 'src/app/models/planapplication.model';
import { PlanapplicationformService } from 'src/app/services/planapplicationform.service';

@Component({
  selector: 'app-userplanapplicationform',
  templateUrl: './userplanapplicationform.component.html',
  styleUrls: ['./userplanapplicationform.component.css']
})
export class UserplanapplicationformComponent implements OnInit {

  newPlanApplication: PlanApplication = {
    AppliedAmount: 0,
    Status: '',
    ApplicationDate: '',
    Remarks: '',
    ProofDocument: '',
    UserId: 0,
    SavingsPlanId: 0
  };
  formSubmitted = false;

  constructor(private planApplicationService: PlanapplicationformService, private router: Router) { }

  ngOnInit(): void {
  }


  addPlanApplication(): void {
    this.formSubmitted = true;
    if (this.newPlanApplication.AppliedAmount && this.newPlanApplication.Status && this.newPlanApplication.ApplicationDate&& this.newPlanApplication.ProofDocument && this.newPlanApplication.UserId && this.newPlanApplication.SavingsPlanId) {
      this.planApplicationService.addPlanApplication(this.newPlanApplication).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}

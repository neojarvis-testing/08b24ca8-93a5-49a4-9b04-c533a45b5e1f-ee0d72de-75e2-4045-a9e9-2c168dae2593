import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanApplication } from 'src/app/models/planapplication.model';
import { SavingsPlan } from 'src/app/models/savingsplan.model';
import { PlanapplicationformService } from 'src/app/services/planapplicationform.service';
import { SavingsplanService } from 'src/app/services/savingsplan.service';

@Component({
  selector: 'app-userappliedplans',
  templateUrl: './userappliedplans.component.html',
  styleUrls: ['./userappliedplans.component.css']
})
export class UserappliedplansComponent implements OnInit {

  constructor(private planApplicationService: PlanapplicationformService, private extraServ: SavingsplanService ,private router: Router) { }
  planApplications :PlanApplication[] = [];
  savingsplans: SavingsPlan[]=[]
  //userId: number = 1; Replace with the actual user ID

  ngOnInit(): void {
    this.loadAppliedPlans();
  }

  loadAppliedPlans(): void {
    this.planApplicationService.getAllPlanApplications().subscribe(data => {
      this.planApplications = data;
      console.log(this.planApplications);
    });
    this.extraServ.getAllSavingsPlans().subscribe(data => {
      this.savingsplans = data;
      console.log(this.savingsplans);
    });
  }

  deletePlanApplication(planApplicationId: number): void {
    this.router.navigate([`/`]);
  }

  viewImage(proofDocument:string):void{
   
    window.open(proofDocument, '_blank'); //implement the logic to view image in new tab

  }

}

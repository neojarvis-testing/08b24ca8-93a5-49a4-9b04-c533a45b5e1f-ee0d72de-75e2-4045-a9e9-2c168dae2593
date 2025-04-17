import { SavingsPlan } from "./savingsplan.model";
import { User } from "./user.model";

export interface PlanApplication{
    PlanApplicationId?:number;
    AppliedAmount:number;
    Status:string;
    ApplicationDate:string;
    Remarks:string;
    ProofDocument:string;
    UserId:number;
    User?:User;
    SavingsPlanId:number;
    SavingsPlan?: SavingsPlan;
}
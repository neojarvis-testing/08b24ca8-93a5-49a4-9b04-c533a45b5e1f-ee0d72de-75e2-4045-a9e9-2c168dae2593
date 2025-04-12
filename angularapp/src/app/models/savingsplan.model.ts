export interface SavingsPlan{
    SavingPlanId?:number;
    Name:string;
    GoalAmount:number;
    TimeFrame:number;
    RiskLevel:'Low'|'Medium'|'High';
    Description:string;
    Status:string;

}
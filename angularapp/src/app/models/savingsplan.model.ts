export interface SavingsPlan{
    SavingPlanId?:number;
    Name:string;
    GoalAmount:number;
    TimeFrame:number;
    RiskLevel?:'';
    Description:string;
    Status:string;
}
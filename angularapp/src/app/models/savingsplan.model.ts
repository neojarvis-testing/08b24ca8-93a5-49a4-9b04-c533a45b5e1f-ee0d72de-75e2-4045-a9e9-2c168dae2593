export interface SavingsPlan{
    savingPlanId?:number;
    name:string;
    goalAmount:number;
    timeFrame:number;
    riskLevel:'Low'|'Medium'|'High';
    description:string;
    status:string;
}
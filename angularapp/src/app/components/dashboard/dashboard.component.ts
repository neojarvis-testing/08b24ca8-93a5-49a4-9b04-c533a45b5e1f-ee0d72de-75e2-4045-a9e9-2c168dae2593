import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  activeCards: any[] = []; // Holds only active savings plans

  constructor() {}

  ngOnInit(): void {
    this.fetchActiveSavingsPlans();
  }

  fetchActiveSavingsPlans(): void {
    // Mock active savings plans (replace this with API call)
    this.activeCards = [
      { Name: 'Plan 1', GoalAmount: 10000, TimeFrame: 12, RiskLevel: 'Low' },
      { Name: 'Plan 2', GoalAmount: 20000, TimeFrame: 24, RiskLevel: 'Medium' },
    ];
  }
}
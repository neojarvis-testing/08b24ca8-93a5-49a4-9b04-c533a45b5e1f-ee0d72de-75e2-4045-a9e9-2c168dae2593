import { Component, OnInit } from '@angular/core';
//import { SavingsPlanService } from 'src/app/services/savings-plan.service'; // Import the service
import { SavingsplanService } from 'src/app/services/savingsplan.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  cards: any[] = []; // Holds all savings plans
  activeCards: any[] = []; // Holds only active savings plans added by the manager
  zoomStates: boolean[] = []; // To track zoom status of each card
  isHovered: boolean = false; // Track if any card is hovered
  isZoomed: boolean = false; // Track if any card is zoomed

  constructor(private savingsPlanService: SavingsplanService) {}

  ngOnInit(): void {
    this.fetchSavingsPlans();
  }

  fetchSavingsPlans(): void {
    this.savingsPlanService.getAllSavingsPlans().subscribe(
      (data: any[]) => {
        this.cards = data; // Assign all fetched plans
        console.log('Fetched Savings Plans:', this.cards); // Debug fetched data

        // Filter plans added by the manager with status 'Active'
        this.activeCards = this.cards.filter(
          (plan) => plan.Status?.toLowerCase() === 'active' && plan.AddedBy === 'Manager'
        );
        console.log('Active Plans by Manager:', this.activeCards); // Debug active plans

        // Initialize zoom states based on active plans
        this.zoomStates = Array(this.activeCards.length).fill(false);
      },
      (error) => {
        console.error('Error fetching savings plans:', error); // Log errors
      }
    );
  }

  toggleZoom(index: number): void {
    if (this.zoomStates[index]) {
      this.zoomStates[index] = false; // Reset zoom state
      this.isZoomed = false;
    } else {
      this.zoomStates = this.zoomStates.map((_, i) => i === index); // Only zoom the clicked card
      this.isZoomed = true;
    }
  }

  pauseAnimation(): void {
    this.isHovered = true; // Pause the moving animation
  }

  resumeAnimation(): void {
    if (!this.isZoomed) {
      this.isHovered = false; // Resume the moving animation
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { SavingsplanService } from 'src/app/services/savingsplan.service';
import { SavingsPlan } from 'src/app/models/savingsplan.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cards: any[] = []; // Holds the plans
  zoomStates: boolean[] = []; // To track zoom status of each card
  isHovered: boolean = false; // Track if any card is hovered
  isZoomed: boolean = false; // Track if any card is zoomed

  constructor(private savingPlanService: SavingsplanService) {}

  ngOnInit(): void {
    this.fetchSavingPlans();
  }

  fetchSavingPlans(): void {
    this.savingPlanService.getAllSavingsPlans().subscribe(
      (data) => {
        console.log('Fetched Plans:', data); // Debug fetched data
        this.cards = data; // Assign data to cards
        this.zoomStates = Array(this.cards.length).fill(false); // Initialize zoom states
      },
      (error) => {
        console.error('Error fetching saving plans:', error);
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
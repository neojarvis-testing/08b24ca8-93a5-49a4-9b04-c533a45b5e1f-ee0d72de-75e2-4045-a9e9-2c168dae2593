import { Component, OnInit } from '@angular/core';
import { SavingsplanService } from 'src/app/services/savingsplan.service'; // Import the service
import { SavingsPlan } from 'src/app/models/savingsplan.model'; // Import the model

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cards: SavingsPlan[] = []; // Array to hold saving plans fetched from the backend
  zoomStates = Array(this.cards.length).fill(false); // To track zoom states of cards
  isHovered = false; // Track if a card is hovered
  isZoomed = false; // Track if any card is zoomed

  constructor(private savingsPlan:SavingsplanService) {}

  ngOnInit(): void {
    this.fetchSavingPlans(); // Fetch saving plans on component initialization
  }

  // Fetch saving plans from the service
  fetchSavingPlans(): void {
    this.savingsPlan.getAllSavingsPlans().subscribe(
      (data: SavingsPlan[]) => {
        this.cards = data; // Assign fetched data to the `cards` array
        this.zoomStates = Array(this.cards.length).fill(false); // Reset zoomStates based on data length
      },
      (error) => {
        console.error('Error fetching saving plans:', error);
      }
    );
  }

  toggleZoom(index: number) {
    if (this.zoomStates[index]) {
      this.zoomStates[index] = false;
      this.isZoomed = false;
    } else {
      this.zoomStates = this.zoomStates.map((_, i) => i === index);
      this.isZoomed = true;
    }
  }

  pauseAnimation() {
    this.isHovered = true; // Pause animation for all cards
  }

  resumeAnimation() {
    if (!this.isZoomed) {
      this.isHovered = false; // Resume animation for all cards
    }
  }
}
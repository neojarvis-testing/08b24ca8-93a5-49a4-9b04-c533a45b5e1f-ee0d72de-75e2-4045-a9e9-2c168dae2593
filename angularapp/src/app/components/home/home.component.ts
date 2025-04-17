import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  cards = [
    {
      title: 'chota Save',
      description:
        '3 Lakhs ChitPlan<br>Save ₹2,000 / month<br>Duration: 15 months',
    },
    {
      title: 'bada Save',
      description:
        '5 Lakhs ChitPlan<br>Save ₹3,000 / month<br>Duration: 15 months',
    },
    {
      title: 'zyada Save',
      description:
        '10 Lakhs ChitPlan<br>Save ₹5,000 / month<br>Duration: 15 months',
    },
    {
      title: 'mini Save',
      description:
        '1 Lakh ChitPlan<br>Save ₹1,000 / month<br>Duration: 10 months',
    },
    {
      title: 'mega Save',
      description:
        '8 Lakhs ChitPlan<br>Save ₹8,000 / month<br>Duration: 5 months',
    },
    {
      title: 'super Save',
      description:
        '12 Lakhs ChitPlan<br>Save ₹12,000 / month<br>Duration: 4 months',
    },
  ];

  zoomStates = Array(this.cards.length).fill(false); // To track zoom states of cards
  isHovered = false; // Track if a card is hovered
  isZoomed = false; // Track if any card is zoomed

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
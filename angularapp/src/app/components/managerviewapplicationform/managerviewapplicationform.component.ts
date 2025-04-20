import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PlanApplication } from 'src/app/models/planapplication.model';
import { PlanapplicationformService } from 'src/app/services/planapplicationform.service';
import { SavingsplanService } from 'src/app/services/savingsplan.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-managerviewapplicationform',
  templateUrl: './managerviewapplicationform.component.html',
  styleUrls: ['./managerviewapplicationform.component.css']
})
export class ManagerviewapplicationformComponent implements OnInit {
  planApplications: PlanApplication[] = [];
  filteredPlanApplications: PlanApplication[] = [];
  searchPlanName: string = '';
  popupImageSrc: string = '';
  showPopup: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  
  // Sorting state for each column
  sortOrder: { [key: string]: 'asc' | 'desc' | '' } = {
    ApplicantName: '',
    PlanName: '',
    AppliedAmount: '',
    ApplicationDate: '',
    Status: ''
  };

  constructor(
    private planApplicationformService: PlanapplicationformService,
    private savingsPlanService: SavingsplanService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchPlanApplications();
  }

  fetchPlanApplications() {
    this.planApplicationformService.getAllPlanApplications().subscribe((applications) => {
      const uniqueUserIds = [...new Set(applications.map(app => app.UserId))];
      const uniquePlanIds = [...new Set(applications.map(app => app.SavingsPlanId))];

      forkJoin({
        users: forkJoin(uniqueUserIds.map(id => this.authService.getUserById(id))),
        plans: forkJoin(uniquePlanIds.map(id => this.savingsPlanService.getSavingsPlanById(id)))
      }).subscribe(({ users, plans }) => {
        const userMap = new Map(users.map(user => [user.UserId, user]));
        const planMap = new Map(plans.map(plan => [plan.SavingPlanId, plan]));

        this.planApplications = applications.map(app => ({
          ...app,
          User: userMap.get(app.UserId),
          SavingsPlan: planMap.get(app.SavingsPlanId)
        }));

        this.filteredPlanApplications = [...this.planApplications];
      });
    });
  }

  searchApplications() {
    const searchTerm = this.searchPlanName.toLowerCase().trim();
    if (searchTerm) {
      this.filteredPlanApplications = this.planApplications.filter(app =>
        app.SavingsPlan?.Name?.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredPlanApplications = [...this.planApplications];
    }
  }

  get paginatedApplications(): PlanApplication[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPlanApplications.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  updateApplicationStatus(application: PlanApplication, status: 'Approved' | 'Rejected') {
    const updatedApplication = { ...application, Status: status };
    this.planApplicationformService.updatePlanApplication(application.PlanApplicationId, updatedApplication).subscribe(() => {
      application.Status = status; // Update the status locally
    });
  }
  filterApplicationsByPlanName() {
    if (this.searchPlanName.trim()) {
      this.filteredPlanApplications = this.planApplications.filter(app => 
        app.SavingsPlan?.Name?.toLowerCase().includes(this.searchPlanName.toLowerCase())
      );
    } else {
      this.filteredPlanApplications = [...this.planApplications];
    }
  }


  // Pagination logic
  get paginatedPlanApplications(): PlanApplication[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPlanApplications.slice(startIndex, startIndex + this.itemsPerPage);
  }


  totalPages(): number {
    return Math.ceil(this.filteredPlanApplications.length / this.itemsPerPage);
  }

  
  // Generic sorting method for columns
  sortColumn(column: string) {
    // Toggle sort order: asc -> desc -> reset
    if (this.sortOrder[column] === 'asc') {
      this.sortOrder[column] = 'desc';
    } else if (this.sortOrder[column] === 'desc') {
      this.sortOrder[column] = '';
    } else {
      this.sortOrder[column] = 'asc';
    }

    // Clear sorting on other columns
    Object.keys(this.sortOrder).forEach(key => {
      if (key !== column) {
        this.sortOrder[key] = '';
      }
    });

    // Perform sorting
    this.filteredPlanApplications = [...this.planApplications]; // Reset to default order
    if (this.sortOrder[column] === 'asc') {
      this.filteredPlanApplications.sort((a, b) => this.compareValues(a, b, column, 'asc'));
    } else if (this.sortOrder[column] === 'desc') {
      this.filteredPlanApplications.sort((a, b) => this.compareValues(a, b, column, 'desc'));
    }
  }

  // Helper to compare values for sorting
  compareValues(a: PlanApplication, b: PlanApplication, column: string, order: 'asc' | 'desc'): number {
    const valueA = this.getColumnValue(a, column);
    const valueB = this.getColumnValue(b, column);

    if (valueA < valueB) return order === 'asc' ? -1 : 1;
    if (valueA > valueB) return order === 'asc' ? 1 : -1;
    return 0;
  }

  // Helper to retrieve column value
  getColumnValue(application: PlanApplication, column: string): any {
    switch (column) {
      case 'ApplicantName':
        return application.User?.Username || '';
      case 'PlanName':
        return application.SavingsPlan?.Name || '';
      case 'AppliedAmount':
        return application.AppliedAmount || 0;
      case 'ApplicationDate':
        return application.ApplicationDate || '';
      case 'Status':
        return application.Status || '';
      default:
        return '';
    }
  }
  
}
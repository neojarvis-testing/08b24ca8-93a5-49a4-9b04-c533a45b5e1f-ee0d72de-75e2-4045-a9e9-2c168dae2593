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

  // Pagination properties
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
    this.getAllPlanApplications();
  }

  // Fetch all plan applications and load details in parallel
  getAllPlanApplications() {
    this.planApplicationformService.getAllPlanApplications().subscribe((applications: PlanApplication[]) => {
      const userRequests = applications.map((application) =>
        this.authService.getUserById(application.UserId)
      );
      const planRequests = applications.map((application) =>
        this.savingsPlanService.getSavingsPlanById(application.SavingsPlanId)
      );

      forkJoin([forkJoin(userRequests), forkJoin(planRequests)]).subscribe(([users, plans]) => {
        applications.forEach((application, index) => {
          application.User = users[index];
          application.SavingsPlan = plans[index];
        });

        this.planApplications = applications;
        this.filteredPlanApplications = [...this.planApplications];
      });
    });
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

  // Filter applications by plan name
  filterApplicationsByPlanName() {
    if (this.searchPlanName.trim()) {
      this.filteredPlanApplications = this.planApplications.filter(app => 
        app.SavingsPlan?.Name?.toLowerCase().includes(this.searchPlanName.toLowerCase())
      );
    } else {
      this.filteredPlanApplications = [...this.planApplications];
    }
  }

  // Approve a pending application
  approve(planApplication: PlanApplication) {
    if (planApplication.Status === 'Pending') {
      const updatedApplication = { ...planApplication, Status: 'Approved' };
      this.planApplicationformService.updatePlanApplication(updatedApplication.PlanApplicationId, updatedApplication).subscribe(() => {
        planApplication.Status = 'Approved'; // Update status directly after success
      });
    }
  }

  // Reject a pending application
  reject(planApplication: PlanApplication) {
    if (planApplication.Status === 'Pending') {
      const updatedApplication = { ...planApplication, Status: 'Rejected' };
      this.planApplicationformService.updatePlanApplication(updatedApplication.PlanApplicationId, updatedApplication).subscribe(() => {
        planApplication.Status = 'Rejected'; // Update status directly after success
      });
    }
  }

  // Pagination logic
  get paginatedPlanApplications(): PlanApplication[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPlanApplications.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  totalPages(): number {
    return Math.ceil(this.filteredPlanApplications.length / this.itemsPerPage);
  }
}
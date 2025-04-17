import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { PlanApplication } from 'src/app/models/planapplication.model';
import { SavingsPlan } from 'src/app/models/savingsplan.model';
import { PlanapplicationformService } from 'src/app/services/planapplicationform.service';
import { SavingsplanService } from 'src/app/services/savingsplan.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userplanapplicationform',
  templateUrl: './userplanapplicationform.component.html',
  styleUrls: ['./userplanapplicationform.component.css']
})
export class UserplanapplicationformComponent implements OnInit {
  id: number = 0;
  planApplicationForm: PlanApplication = {
    AppliedAmount: 0,
    Status: 'Pending',
    ApplicationDate: '',
    Remarks: '',
    ProofDocument: '',
    UserId: 0,
    SavingsPlanId: 0
  };
  savingsPlan: SavingsPlan;
  selectedFile: File | null = null;
  minDate: string;
  maxGoalAmount: number;
  amountError: string = '';
  fileError: string = '';

  constructor(
    private savingsPlanService: SavingsplanService,
    private planApplicationformService: PlanapplicationformService,
    private authService: AuthService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.id = +this.activateRoute.snapshot.params['id'];
    this.planApplicationForm.UserId = this.authService.getUserId();
    this.planApplicationForm.SavingsPlanId = this.id;

    this.savingsPlanService.getSavingsPlanById(this.id).subscribe(res => {
      this.savingsPlan = res;
      this.maxGoalAmount = res.GoalAmount;
    });

    this.setMinDate();
  }

  setMinDate(): void {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    this.minDate = `${year}-${month}-${day}`;
  }

  validateAmount(): void {
    if (this.planApplicationForm.AppliedAmount > this.maxGoalAmount) {
      this.amountError = 'Applied Amount must be less than or equal to the goal amount.';
      Swal.fire('Error', this.amountError, 'error');
    } else {
      this.amountError = '';
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.toLowerCase();
      if (['image/jpeg', 'image/png', 'image/jpg'].includes(fileType)) {
        this.convertToBase64(file);
        this.fileError = '';
      } else {
        this.fileError = 'Only .jpg, .jpeg, and .png files are allowed.';
        this.selectedFile = null;
        (event.target as HTMLInputElement).value = '';
      }
    } else {
      this.fileError = 'Proof Document is required.';
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.planApplicationForm.ProofDocument = reader.result as string;
    };
    reader.onerror = () => {
      this.fileError = 'Error converting file to Base64.';
    };
    reader.readAsDataURL(file);
  }

  onSubmit(form: NgForm): void {
    this.validateAmount();
    if (form.invalid || this.amountError || this.fileError || !this.planApplicationForm.ProofDocument) {
      if (!this.planApplicationForm.ProofDocument) {
        this.fileError = 'Proof Document is required.';
      }
      Swal.fire('Error!', this.fileError || 'Form validation failed.', 'error');
      return;
    }
    this.submitApplication();
  }

  submitApplication(): void {
    console.log(this.planApplicationForm)
    //this.planApplicationForm.ApplicationDate = new Date().toISOString(); // Set current date
    this.planApplicationformService.addPlanApplication(this.planApplicationForm).subscribe(
      () => {
        Swal.fire('Success!', 'Your application has been submitted.', 'success').then(() => {
          this.router.navigate(['/User/AppliedPlans']);
        });
      },
      (error) => {
        Swal.fire('Error!', 'An error occurred while submitting the application.', 'error');
        console.error(error);
      }
    );
  }
}
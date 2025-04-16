import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { ManagernavComponent } from './components/managernav/managernav.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserviewsavingsplanComponent } from './components/userviewsavingsplan/userviewsavingsplan.component';
import { ManagereditsavingsplanComponent } from './components/managereditsavingsplan/managereditsavingsplan.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ManagerviewsavingsplanComponent } from './components/managerviewsavingsplan/managerviewsavingsplan.component';
import { UserappliedplansComponent } from './components/userappliedplans/userappliedplans.component';
import { ManagerviewapplicationformComponent } from './components/managerviewapplicationform/managerviewapplicationform.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthGuard } from './components/authguard/auth.guard';
import { ManagercreatesavingsplanComponent } from './components/managercreatesavingsplan/managercreatesavingsplan.component';
import { UserplanapplicationformComponent } from './components/userplanapplicationform/userplanapplicationform.component';
import { Feedback } from './models/feedback.model';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';

const routes: Routes = [
  {path:'Home',component:HomeComponent},
  {path:'Register', component:RegistrationComponent},
  {path:'Login', component:LoginComponent},
  {path:'RegionalManager', component:ManagerviewsavingsplanComponent, canActivate: [AuthGuard], data: { roles: ['RegionalManager'] }},
  {path:'Customer', component:UserviewsavingsplanComponent, canActivate: [AuthGuard], data: { roles: ['Customer'] } },
  {path:'Manager/SavingPlans', component:ManagerviewsavingsplanComponent},
  {path:'Manager/AddSavingPlan',component:ManagercreatesavingsplanComponent},
  {path:'Manager/EditSavingPlan/:id', component:ManagereditsavingsplanComponent},
  {path:'Manager/ApplicationForms', component:ManagerviewapplicationformComponent},
  {path:'User/SavingPlans', component:UserviewsavingsplanComponent},
  {path:'User/PlanApplication', component:UserplanapplicationformComponent},
  {path:'User/AppliedPlans', component:UserappliedplansComponent},
  {path:'User/Feedbacks',component:UserviewfeedbackComponent},
  {path:'User/AddFeedback', component:UseraddfeedbackComponent},
  {path:'Manager/Feedback', component:ManagerviewfeedbackComponent},
  {path:'error', component:ErrorComponent},
  {path: '', redirectTo: '/Login', pathMatch: 'full' },
  {path: '**', redirectTo: '/error' }
];
 
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
 
export class AppRoutingModule { }
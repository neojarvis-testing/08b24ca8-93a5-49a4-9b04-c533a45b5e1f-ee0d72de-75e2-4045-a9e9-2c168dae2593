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

const routes: Routes = [
  {path:'Register', component:RegistrationComponent},
  {path:'Login', component:LoginComponent},
  {path:'RegionalManager', component:ManagerviewsavingsplanComponent},
  {path:'Customer', component:UserviewsavingsplanComponent},
  {path: '', redirectTo: '/Login', pathMatch: 'full' },
  {path:'Home',component:HomeComponent},
  {path:'Manager/SavingPlans', component:ManagerviewsavingsplanComponent},
  {path:'Manager/ApplicationForms', component:ManagerviewapplicationformComponent},
  {path:'User/SavingPlans', component:UserviewsavingsplanComponent},
  {path:'User/AppliedPlans', component:UserappliedplansComponent},
  {path: '**', redirectTo: '/error' }
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

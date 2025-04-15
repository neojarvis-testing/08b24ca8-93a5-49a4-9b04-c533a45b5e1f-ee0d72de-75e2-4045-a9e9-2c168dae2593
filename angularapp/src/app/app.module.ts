import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManagercreatesavingsplanComponent } from './components/managercreatesavingsplan/managercreatesavingsplan.component';
import { ManagerviewsavingsplanComponent } from './components/managerviewsavingsplan/managerviewsavingsplan.component';
import { ManagereditsavingsplanComponent } from './components/managereditsavingsplan/managereditsavingsplan.component';
import { HomeComponent } from './components/home/home.component';
import { ManagernavComponent } from './components/managernav/managernav.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserplanapplicationformComponent } from './components/userplanapplicationform/userplanapplicationform.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { PiggyBankLoaderComponent } from './components/piggy-bank-loader/piggy-bank-loader.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserviewsavingsplanComponent } from './components/userviewsavingsplan/userviewsavingsplan.component';
import { UserappliedplansComponent } from './components/userappliedplans/userappliedplans.component';
import { ManagerviewapplicationformComponent } from './components/managerviewapplicationform/managerviewapplicationform.component';



@NgModule({
  declarations: [
    AppComponent,
    UseraddfeedbackComponent,
    ManagercreatesavingsplanComponent,
    ManagerviewsavingsplanComponent,
    ManagereditsavingsplanComponent,
    HomeComponent,
    ManagernavComponent,
    ManagerviewfeedbackComponent,
    NavbarComponent,
    UseraddfeedbackComponent,
    UsernavComponent,
    UserplanapplicationformComponent,
    UserviewfeedbackComponent,
    PiggyBankLoaderComponent,
    ErrorComponent,
    LoginComponent,
    RegistrationComponent,
    UserviewsavingsplanComponent,
    UserplanapplicationformComponent,
    UserappliedplansComponent,
    ManagerviewapplicationformComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { ManagercreatesavingsplanComponent } from './managercreatesavingsplan/managercreatesavingsplan.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManagerviewsavingsplanComponent } from './managerviewsavingsplan/managerviewsavingsplan.component';

@NgModule({
  declarations: [
    AppComponent,
    UseraddfeedbackComponent,
    ManagercreatesavingsplanComponent,
    ManagerviewsavingsplanComponent
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

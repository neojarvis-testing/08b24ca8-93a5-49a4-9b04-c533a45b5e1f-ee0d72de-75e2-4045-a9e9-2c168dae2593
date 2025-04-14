import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserplanapplicationformComponent } from './components/userplanapplicationform/userplanapplicationform.component';

@NgModule({
  declarations: [
    AppComponent,
    UseraddfeedbackComponent,
    UserplanapplicationformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

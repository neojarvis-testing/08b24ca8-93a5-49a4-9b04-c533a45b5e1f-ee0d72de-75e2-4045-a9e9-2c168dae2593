import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { ManagernavComponent } from './components/managernav/managernav.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'',component:UsernavComponent},
  {path:'',component:ManagernavComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

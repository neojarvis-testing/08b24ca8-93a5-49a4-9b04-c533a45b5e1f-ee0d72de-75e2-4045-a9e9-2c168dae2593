import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { ManagernavComponent } from './components/managernav/managernav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserviewsavingsplanComponent } from './components/userviewsavingsplan/userviewsavingsplan.component';
import { ManagereditsavingsplanComponent } from './components/managereditsavingsplan/managereditsavingsplan.component';

const routes: Routes = [
  //{path:'',component:HomeComponent},
  //{path:'',component:NavbarComponent}
  //{path:'',component:UsernavComponent},
  //{path:'',component:ManagernavComponent},
 // {path:'',component:UserviewsavingsplanComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

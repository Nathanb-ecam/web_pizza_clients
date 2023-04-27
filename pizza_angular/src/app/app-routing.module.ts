import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { AdminComponent } from './admin/admin.component';
import { SigninCardComponent } from './signin-card/signin-card.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home",component:HomeComponent},
  {path:"menu",component:MenuComponent},
  {path:"admin",component:AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

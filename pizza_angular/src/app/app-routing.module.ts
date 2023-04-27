import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { PizzaComponent } from './pizza/pizza.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  // {path:"home",component:HomeComponent},
  {path:"menu",component:MenuComponent},
  {path:"pizza",component:PizzaComponent},
  {path:"admin",component:AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

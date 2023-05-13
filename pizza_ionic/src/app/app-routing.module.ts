import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '',redirectTo: 'home',pathMatch: 'full'},
  {path:"home",component:HomeComponent},
  {path:"menu",component:MenuComponent},
  {path:"admin",component:AdminComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

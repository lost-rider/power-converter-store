import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { BuyComponent } from './buy/buy.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  { path: '', component:LoginComponent },
  {path:'menu',component:MenuComponent},
  {path:'buy',component:BuyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }

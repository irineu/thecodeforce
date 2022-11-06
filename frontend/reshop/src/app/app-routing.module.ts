import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {CheckoutCompleteComponent} from "./checkout-complete/checkout-complete.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'checkout/:id', component: CheckoutComponent },
  { path: 'checkout-complete/:id', component: CheckoutCompleteComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

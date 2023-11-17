import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./pages/landing/landing.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {IdleComponent} from "./pages/idle/idle.component";

const routes: Routes = [
  {path: "", component: LandingComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "idle", component: IdleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

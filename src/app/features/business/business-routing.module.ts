import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BusinessPageComponent } from './business-page/business-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'business-page/:id', component: BusinessPageComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }

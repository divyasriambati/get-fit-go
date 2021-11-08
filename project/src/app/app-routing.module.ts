import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoutineComponent } from './add-routine/add-routine.component';
import { CreateRoutineComponent } from './create-routine/create-routine.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RoutineDetailsComponent } from './routine-details/routine-details.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/:id', component: RoutineDetailsComponent },
  { path: 'routine-details/:id', component: RoutineDetailsComponent },
  { path: 'search-page', component: SearchPageComponent },
  { path: 'friendData/:id', component: SearchPageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'add-routine', component: AddRoutineComponent },
  { path: 'create-routine', component: CreateRoutineComponent },
  { path: 'routine/edit/:id', component: CreateRoutineComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoutineDetailsComponent } from './routine-details/routine-details.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DataService } from './data.service';
import { AddRoutineComponent } from './add-routine/add-routine.component';
import { CreateRoutineComponent } from './create-routine/create-routine.component';
import {CalendarModule} from '@syncfusion/ej2-angular-calendars';

import { NgImageSliderModule } from 'ng-image-slider';
import {IvyCarouselModule} from 'angular-responsive-carousel';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatDialogModule} from '@angular/material/dialog';
import { PopUpComponent } from './pop-up/pop-up.component';
import { SearchByRoutineComponent } from './search-by-routine/search-by-routine.component';
import { SearchByFriendsComponent } from './search-by-friends/search-by-friends.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    RoutineDetailsComponent,
    ProfileComponent,
    SearchPageComponent,
    NavbarComponent,
    SidebarComponent,
    AddRoutineComponent,
    CreateRoutineComponent,
    PopUpComponent,
    SearchByRoutineComponent,
    SearchByFriendsComponent,
  ],
  entryComponents:[PopUpComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    HttpClientModule,CalendarModule,

    NgImageSliderModule,
    IvyCarouselModule,
    
    BrowserAnimationsModule,
    MatDialogModule,
    

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

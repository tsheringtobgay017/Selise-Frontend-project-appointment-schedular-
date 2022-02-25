import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { SignupComponent } from './User-dashboard/signup/signup.component';
import { UserloginComponent } from './User-dashboard/userlogin/userlogin.component';
import { UserhomeComponent } from './User-dashboard/userhome/userhome.component';
import { MakeappointmentComponent } from './User-dashboard/makeappointment/makeappointment.component';
import { UserNavbarComponent } from './User-dashboard/user-navbar/user-navbar.component';
import { CreateRoomComponent } from './admin/create-room/create-room.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    AdminDashboardComponent,
    SignupComponent,
    UserloginComponent,
    UserhomeComponent,
    MakeappointmentComponent,
    UserNavbarComponent,
    CreateRoomComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,   
    HttpClientModule,
    
    
  ],
  providers: [ MakeappointmentComponent,UserhomeComponent,LoginComponent,CreateRoomComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

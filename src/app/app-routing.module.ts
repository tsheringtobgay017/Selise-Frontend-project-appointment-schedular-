
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserhomeComponent } from './User-dashboard/userhome/userhome.component';
import { UserloginComponent } from './User-dashboard/userlogin/userlogin.component';
import { SignupComponent } from './User-dashboard/signup/signup.component';
import { MakeappointmentComponent } from './User-dashboard/makeappointment/makeappointment.component';
import { UserGaurdGuard } from './User-dashboard/guard/user-guard.guard';
import { AdminGuard } from './admin/authguard/auth.guard';
import { LoginComponent } from './admin/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { CreateRoomComponent } from './admin/create-room/create-room.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login' , pathMatch: 'full'
  },
  {
    path: 'login', component:LoginComponent
  },
  {
    path: 'dashboard', component: AdminComponent, canActivate: [AdminGuard]
  },

  {
    path: "dashboard", loadChildren: () => import('./admin/admin-routing.module')
      .then(m => m.AdminsRoutingModule), canActivate: [AdminGuard]
  },
  {
    path: 'createroom', component: CreateRoomComponent, canActivate: [AdminGuard]
  },

  //This are the route of users
  {
    path: 'makeappointment', component: MakeappointmentComponent, canActivate: [UserGaurdGuard]
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'userlogin', component: UserloginComponent
  },
  {
    path: 'userhome', component: UserloginComponent             
  },
  {
    path: 'userhome', component: UserloginComponent             
  },



  {
    path: "home", loadChildren: () => import('./User-dashboard/users/users-routing.module')
      .then(m => m.UsersRoutingModule), canActivate: [UserGaurdGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }









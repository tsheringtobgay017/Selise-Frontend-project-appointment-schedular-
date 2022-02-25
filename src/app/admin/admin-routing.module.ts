import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRoomComponent } from './create-room/create-room.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [ ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }

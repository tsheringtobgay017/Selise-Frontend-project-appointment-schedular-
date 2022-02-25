import { Component, OnInit } from '@angular/core';
import { ApiService } from '../json-server/api.services';
import { AdminModule } from './admin.module';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user!: any;
  userObj: AdminModule = new AdminModule();
  approve = false;
  constructor( private api: ApiService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers() {
    this.api.getUsers(this.userObj)
      .subscribe(res => {
        this.user = res;
        console.log(res)

      })
  }
  deleteAllUsers(user: any) {
    this.api.deleteUsers(user.id)
      .subscribe(res => {
        this.getAllUsers();
        alert('User Deleted')
      })
  }
  approveUser(user: any) {
    this.api.updateUser(user)
      .subscribe(res => {
        this.getAllUsers();
        alert('User Approved')
      })

  }

}






 
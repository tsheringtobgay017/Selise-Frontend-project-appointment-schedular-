import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../json-server/api.services';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  users: any;
  userName: any;

  usersDetails: any;
  usersName: any;
  public loginForm !: FormGroup;

  
  constructor(private api: ApiService, private router: Router) {
    this.api.navUser().subscribe((res) => {
      this.users = res;
    })
   }

  ngOnInit(): void {
    this.usersName = this.usersDetails.fullname;
  }

  logoutUser() {
    window.alert('You are logout')
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}




import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  adminDetails: any;
  adminName: any;

  constructor(private router: Router, private adminC: LoginComponent) { }

  ngOnInit(): void {
  }
  logOut() {
    alert("you are logout")
    localStorage.removeItem('admin');
    this.router.navigate(['login']);
  }
}
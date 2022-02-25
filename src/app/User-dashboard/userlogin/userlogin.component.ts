import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor( private formBuilder: FormBuilder, private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      id: [],
      isApprove: [false],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9a-z_%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(13),
        ],
      ],
    });
  }
  login() {
    this.http.get<any>('http://localhost:3000/Users').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
          );
        });
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.loginForm.reset();
          if (user.isApprove) {
            alert('You are login');
            this.route.navigate(['home']);
          } else {
            alert('You are declined by admin');
          }
        } else {
          alert('User Failed to Login');
        }
      },
      (err) => {
        alert('Error');
      }
    );
  }
  get email() {
    return this.loginForm.get('email');
  } 
}



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/json-server/api.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  constructor(private formBuilder : FormBuilder, private api: ApiService, private route: Router) { }

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login(){
    this.api.getCridential()
    .subscribe(
      (res) => {
        const admin = res.find((i: any) => {
          return (
            i.email === this.LoginForm.value.email &&
            i.password === this.LoginForm.value.password
          );
        });
        if (admin) {
          localStorage.setItem('admin', JSON.stringify(admin));
          alert('admin login');
          this.LoginForm.reset();
          this.route.navigate(['/dashboard']);
        } else {
          alert('Admin missing!');
        }
      },
      (error) => {
        alert('Error');
      }
    );
  }
}
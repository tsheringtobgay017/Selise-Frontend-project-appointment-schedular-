import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../json-server/api.services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm !: FormGroup;

  constructor( private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9_%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      phone: ['', [Validators.required, Validators.maxLength(8)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(13)]],
      isApprove: [false]
    })
  }
    
  signUp() {
    
    this.api.getIndividualUsers(this.email?.value).subscribe(res => {
      if (res.length == 0) {
        this.http.post<any>("http://localhost:3000/Users", this.signupForm.value)
          .subscribe(res => {
            alert("You are register");
            this.signupForm.reset();
            this.router.navigate(['login']);
          },
            err => {
              alert("Error")
            })
      }
      else {
        alert("this email has already register")
      }
    })
 
  }


  get fullname() { return this.signupForm.get('fullname'); }

  get email() { return this.signupForm.get('email') }


}





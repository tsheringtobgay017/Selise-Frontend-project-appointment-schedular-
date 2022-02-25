import { Component, OnInit } from '@angular/core';
import { Appointment } from '../userappointment/userappointment.model';
import { ApiService } from 'src/app/json-server/api.services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  appointmentData!: any;
  appointmentObj: Appointment = new Appointment();

  constructor( private api: ApiService, private router: Router ) { }

  ngOnInit(): void {
    this.displayAllAppointmentData();
  }
  displayAllAppointmentData() {
    this.api.getAllAppointments().subscribe((res) => {
      this.appointmentData = res;
    });
  }

}


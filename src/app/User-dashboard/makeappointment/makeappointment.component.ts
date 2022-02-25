import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/json-server/api.services';
import { Room } from 'src/app/admin/models/roomBooking.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../userappointment/userappointment.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-makeappointment',
  templateUrl: './makeappointment.component.html',
  styleUrls: ['./makeappointment.component.css']
})
export class MakeappointmentComponent implements OnInit {
  appointmentValue!: FormGroup;
  appointmentData!: any;
  getAppointments: any;

  submitAppointmentButton!: boolean;
  updateAppointmentButton!: boolean;

  appointmentObj = new Appointment();
  updateappointmentObj = new Appointment();
  roomObj: Room = new Room();

  userDetails: any;
  user_id: any;


  constructor(private api: ApiService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.appointmentValue = this.formBuilder.group({
      appointmentName: ['', Validators.required],
      roomName: ['', Validators.required],
      date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
    });

    
    this.userDetails = localStorage.getItem('user');
    this.user_id = this.userDetails.id;
    this.displayAllAppointments();
    this.displayRoomDetials();
  }
  displayRoomDetials() {
    this.api.getRoomDetails().subscribe((res) => {
      this.appointmentData = res;
    });
  }

  displayAllAppointments() {
    this.api.getAllAppointments().subscribe((res) => {
      this.getAppointments = res;
    });
  }

  makeNewAppointment() {
    this.appointmentValue.reset();
    this.submitAppointmentButton = true;
    this.updateAppointmentButton = false;
  }

  result: any;
  createAppointments() {
    this.appointmentObj.appointmentName = this.appointmentValue.value.appointmentName;
    this.appointmentObj.roomName = this.appointmentValue.value.roomName; 
    this.appointmentObj.date = this.appointmentValue.value.date;
    this.appointmentObj.start_time = this.appointmentValue.value.start_time;
    this.appointmentObj.end_time = this.appointmentValue.value.end_time;
    this.appointmentObj.createBy = this.user_id;
    this.api
      .getDuplicationAppointments(
        this.appointmentValue.value.roomName,
        this.appointmentValue.value.date,
        this.appointmentValue.value.start_time,
        this.appointmentValue.value.end_time
      )
      .subscribe((res) => {
        if (res.length == 0) {
          this.api.saveAppointments(this.appointmentObj).subscribe((res) => {
            console.log('cretedby', this.appointmentObj.createBy);
            alert('Appointment Created');
            this.displayAllAppointments();
          });
        } else {
          alert('Appointment booked already');
        }
      });
  }
  editAppointments(row: any) {
    this.submitAppointmentButton = false;
    this.updateAppointmentButton = true;

    console.log(this.submitAppointmentButton);
    this.appointmentObj = row.id;
    this.appointmentValue.controls['appointmentName'].setValue(
      row.appointmentName
    );
    this.appointmentValue.controls['roomName'].setValue(row.roomName);
    this.appointmentValue.controls['date'].setValue(row.date);
    this.appointmentValue.controls['start_time'].setValue(row.start_time);
    this.appointmentValue.controls['end_time'].setValue(row.end_time);
  }

  removeAppointments(data: any) {
    this.api.deleteAppointments(data.id).subscribe((res) => {
      alert('Appointment Deleted');
      this.displayAllAppointments();
    });
  }

  updateAppointmentDetails() {
     console.log(this.appointmentValue.value.appointmentName);

    this.appointmentValue.value.appointmentName;
    this.updateappointmentObj.roomName = this.appointmentValue.value.roomName;
    this.updateappointmentObj.date = this.appointmentValue.value.date;
    this.updateappointmentObj.start_time =
    this.appointmentValue.value.start_time;
    this.updateappointmentObj.end_time = this.appointmentValue.value.end_time;
    this.updateappointmentObj.createBy = this.user_id;

    console.log(this.appointmentObj, 'results');

    this.api
      .updateAppointments(this.appointmentObj, this.updateappointmentObj)
      .subscribe((res) => {
        alert('Data Updated');
        this.appointmentValue.reset();
        this.updateappointmentObj.id = 0;
        this.displayAllAppointments();
      });
    console.log('Update');
  }
}

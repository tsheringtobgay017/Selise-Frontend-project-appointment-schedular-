import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/json-server/api.services';
import { Room } from '../models/roomBooking.model';
@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  roomValue!: FormGroup;
  roomData!: any;
  roomObj: Room = new Room();
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor( private formBuilder: FormBuilder, private api: ApiService, private route: Router) { }

  ngOnInit(): void {
    this.roomValue = this.formBuilder.group({
      roomName: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.displayAllRoom();
  
  }
  addNewRoom() {
    this.roomValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }


  createRooms() {
    this.roomObj.roomName = this.roomValue.value.roomName;
    this.roomObj.description = this.roomValue.value.description;

    this.api.uploadRooms(this.roomObj).subscribe(
      (res) => {
        console.log(res);
        alert('Room Added');
        this.roomValue.reset();
        this.displayAllRoom();
      },
      (error) => {
        alert('error');
      }
    );
  }

  displayAllRoom() {
    this.api.getAllRooms().subscribe((res) => {
      this.roomData = res;
    });
  }

  editRooms(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.roomObj.id = data.id;
    this.roomValue.controls['roomName'].setValue(data.roomName);
    this.roomValue.controls['description'].setValue(data.description);
  }

  removeRooms(data: any) {
    this.api.deleteRoom(data.id).subscribe((res) => {
      alert('Room Deleted');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.displayAllRoom();
    });
  }

  updateSaveRooms() {
    this.roomObj.roomName = this.roomValue.value.roomName;
    this.roomObj.description = this.roomValue.value.description;

    this.api.updateRoom(this.roomObj, this.roomObj.id).subscribe((res) => {
      alert('your data has been uploaded successfully');
      this.roomValue.reset();
      this.displayAllRoom();
    });
  }

}





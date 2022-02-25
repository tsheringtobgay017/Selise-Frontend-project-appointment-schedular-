import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
  isApprove: boolean = false



  getUsers(data: any) {
    return this.http.get<any>('http://localhost:3000/Users', data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getUrl = ""
  getIndividualUsers(email: any) {
    this.getUrl = 'http://localhost:3000/Users?email=' + email
    return this.http.get<any>(this.getUrl)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deleteUsers(id: number) {
    return this.http.delete<any>("http://localhost:3000/Users/" + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  public signupForm !: FormGroup;
  updateUser(user: any) {

    this.signupForm = this.formBuilder.group({
      fullname: [user.fullname],
      email: [user.email], 
      phone: [user.phone],
      password: [user.password],
      isApprove: [true]
    })
    return this.http.put<any>("http://localhost:3000/Users/" + user.id, this.signupForm.value)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  url = 'http://localhost:3000/Users';
  navUser() {
    return this.http.get(this.url);
  }



  getAllRooms() {
    return this.http.get<any>("http://localhost:3000/roomlist")
      .pipe(map((req: any) => {
        return req;
      }))
  }

  uploadRooms(data: any) {
    return this.http.post<any>("http://localhost:3000/roomlist", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }


  updateRoom(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/roomlist/" + id, data)
      .pipe(map((res: any) => {
        return res;
      }))

  }


  deleteRoom(id: number) {
    return this.http.delete<any>("http://localhost:3000/roomlist/" + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }


  getAllAppointments() {
    return this.http.get<any>("http://localhost:3000/appointment")
      .pipe(map((req: any) => {
        return req;
      }))
  }

  getRoomDetails() {
    return this.http.get<any>("http://localhost:3000/roomlist")
      .pipe(map((req: any) => {
        return req;
      }))
  }

  saveAppointments(data: any) {
    return this.http.post<any>("http://localhost:3000/appointment", data) 
      .pipe(map((req: any) => {
        return req;
      }))
  }

  

  updateAppointments(id: any, data: any) {
    return this.http.put<any>("http://localhost:3000/appointment/" + id, data) 
      .pipe(map((res: any) => {
        return res;
      }))
  }

 

  deleteAppointments(id: number) { 
    return this.http.delete<any>("http://localhost:3000/appointment/" + id)
      .pipe(map((req: any) => {
        return req;
      }))
  }

  getCridential() {
    return this.http.get<any>("http://localhost:3000/adminCredential")
      .pipe(map((req: any) => {
        return req;
      }))
  }


  getSingleDate(date: any) {
    return this.http.get<any>('//http://localhost:3000/appointment?date=' + date)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getDuplicationAppointments(roomName: any, date: any, start_time: any, end_time: any) {
    return this.http.get<any>("http://localhost:3000/appointment?roomName=" + roomName + "&date=" + date + "&start_date=" + start_time + "&end_time=" + end_time)
      .pipe(map((req: any) => {
        return req;
      }))
  }
  getSingleEndTime(end_time: any) {
    return this.http.get<any>('//http://localhost:3000/appointment?end_time=' + end_time)
      .pipe(map((res: any) => {
        return res;
      }))
  }

}

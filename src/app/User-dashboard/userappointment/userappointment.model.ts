import { Time } from '@angular/common';

export class Appointment {
    id?: any = 0;
    appointmentName?: string; 
    date?: any = 0;
    start_time?: Time;
    end_time?: Time;
    roomName?: string;
    createBy: any;
}
  
  

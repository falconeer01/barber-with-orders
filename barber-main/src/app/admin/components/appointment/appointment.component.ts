import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import { Appointment } from '../../../models/appointment';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
import { AppointmentUpdateComponent } from './appointment-update/appointment-update.component';
import { UserWithAppointment } from '../../../models/user';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, AppointmentAddComponent, AppointmentUpdateComponent],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})

export class AppointmentComponent implements OnInit{
  constructor(
    private appointmentService:AppointmentService,
  ){}

  appointments:Appointment[]=[];
  selectedAppointment!:Appointment;
  userWithAppointment!:UserWithAppointment;

  @ViewChild(AppointmentAddComponent, {static:true}) addAppointmentComponent !: AppointmentAddComponent;
  @ViewChild(AppointmentUpdateComponent, {static:true}) updateAppointmentComponent !: AppointmentUpdateComponent;

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.appointmentService.getAll().subscribe(res=>{
      this.appointments = res.data;
    })
  }

  getAllDeleted(){
    this.appointmentService.getAllDeleted().subscribe(res=>{
      this.appointments = res.data;
    })
  }

  getAllNotDeleted(){
    this.appointmentService.getAllNotDeleted().subscribe(res=>{
      this.appointments = res.data;
    })
  }

  showAddModal(){
    this.addAppointmentComponent.createAppointmentForm();
  }

  showEditModal(appointment:Appointment){
    this.updateAppointmentComponent.appointmentUpdateForm(appointment);
  }

  deleteServiceById(id:number){
    this.appointmentService.deleteById(id).subscribe(result=>{
      this.getAll();
    })
  }

  hardDeleteById(id:number){
    this.appointmentService.hardDeleteById(id).subscribe();
  }

  restoreById(id:number){
    this.appointmentService.restoreById(id).subscribe();
  }
}

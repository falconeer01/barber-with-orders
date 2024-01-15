import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from '../../../../services/appointment.service';
import { Appointment } from '../../../../models/appointment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './appointment-update.component.html',
  styleUrl: './appointment-update.component.scss'
})
export class AppointmentUpdateComponent {
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private appointmentService:AppointmentService
  ){}

  updateForm!:FormGroup;

  @Output() onLoad:EventEmitter<unknown>=new EventEmitter();

  appointmentUpdateForm(appointment:Appointment){
    this.updateForm=this.formBuilder.group({
      id:[appointment.id, Validators.required],
      userId:[appointment.userId, Validators.required],
      fullName:[appointment.fullName,Validators.required],
      phoneNumber:[appointment.phoneNumber,Validators.required],
      email:[appointment.email,Validators.required],
      startDate:[appointment.startDate,Validators.required],
      endDate:[appointment.endDate,Validators.required],
    })
  }

  onSubmit(){
    if(!this.updateForm.valid){
      this.toastrService.warning("Please check the form.","Warning");
      return;
    }

    let appointment:Appointment=Object.assign({},this.updateForm.value);

    this.appointmentService.update(appointment).subscribe(result=>{
      if(typeof document ==undefined) return;
      document.querySelector(".edit-modal")?.classList.toggle("show");
      document.querySelector(".modal-backdrop")?.classList.toggle("show");
      this.onLoad.emit();
    })
  }
}

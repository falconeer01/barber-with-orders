import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../../../services/order.service';
import { Order } from '../../../../models/order';

@Component({
  selector: 'app-order-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './order-add.component.html',
  styleUrl: './order-add.component.scss'
})
export class OrderAddComponent {
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private orderService:OrderService
  ){}

  orderForm!:FormGroup;

  @Output() onLoad:EventEmitter<unknown>=new EventEmitter();

  createOrderForm(){
    this.orderForm=this.formBuilder.group({
      fullName:['', Validators.required],
      phoneNumber:['', Validators.required],
      email:['', Validators.required],
      cargoBranch:['', Validators.required],
      sendDate:['', Validators.required],
      sendCode:['', Validators.required],
      isSend:['', Validators.required],
      isCancel:['', Validators.required],
      cancelledAt:['', Validators.required],
      cancelledUser:['', Validators.required]
    })
  }

  onSubmit(){
    if(!this.orderForm.valid){
      this.toastrService.warning("Please check the form.","Warning");
      return;
    }

    let order:Order=Object.assign({}, this.orderForm.value);

    this.orderService.create(order).subscribe(res=>{
      if(typeof document ==undefined) return;
      document.querySelector(".create-modal")?.classList.toggle("show");
      document.querySelector(".modal-backdrop")?.classList.toggle("show");
      this.onLoad.emit();
    })
  }
}

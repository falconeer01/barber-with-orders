import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../../../services/order.service';
import { Order } from '../../../../models/order';

@Component({
  selector: 'app-order-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './order-update.component.html',
  styleUrl: './order-update.component.scss'
})

export class OrderUpdateComponent {
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private orderService:OrderService
  ){}

  orderForm!:FormGroup;

  @Output() onLoad:EventEmitter<unknown>=new EventEmitter();

  updateOrderForm(order:Order){
    this.orderForm=this.formBuilder.group({
      id:[order.id, Validators.required],
      fullName:[order.fullName, Validators.required],
      phoneNumber:[order.phoneNumber, Validators.required],
      email:[order.email, Validators.required],
      cargoBranch:[order.cargoBranch, Validators.required],
      sendDate:[order.sendDate, Validators.required],
      sendCode:[order.sendCode, Validators.required],
      isSend:[order.isSend, Validators.required],
      isCancel:[order.isCancel, Validators.required],
      cancelledAt:[order.cancelledAt, Validators.required],
      cancelledUser:[order.cancelledUser, Validators.required]
    })
  }

  onSubmit(){
    this.orderForm.valid ? this.toastrService.warning("Please check the form.","Warning") : console.log("aynen");

    let order:Order=Object.assign({}, this.orderForm.value);

    this.orderService.update(order).subscribe(res=>{
      if(typeof document ==undefined) return;
      document.querySelector(".create-modal")?.classList.toggle("show");
      document.querySelector(".modal-backdrop")?.classList.toggle("show");
      this.onLoad.emit();
    })
  }
}

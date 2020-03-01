import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {NgForm} from "@angular/forms";
import {OrderService} from "../../services/order.service";
import {Response} from "../../interfaces/Response";
import {SocketService} from "../../services/socket.service";

@Component({
  selector: 'app-modal-make-out-order',
  templateUrl: './modal-make-out-order.component.html',
  styleUrls: ['./modal-make-out-order.component.css']
})
export class ModalMakeOutOrderComponent implements OnInit {
  public orderLst: any;
  public restaurant_id: number;
  public totalPrice: number;
  public showPayBtn: boolean = true;
  public showSendBtn: boolean = false;
  public check: boolean = true;


  constructor(

    public OrderService:OrderService,
    public SocketService:SocketService,
    public dialogRef: MatDialogRef<ModalMakeOutOrderComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit() {

  }

  CloseModal() {
    this.dialogRef.close();
  }

  SendOrder(Form: NgForm) {
    console.log(Form.value);
    console.log(this.data);
    this.OrderService.SaveOrder(this.data.orderList, this.data.restaurant_id, this.data.totalPrice, Form.value.tableNumber, Form.value.pay)
      .subscribe((data:Response) => {
        console.log(data);
        if (data.success == true) {
                this.SocketService.sendRestaurantId(this.restaurant_id)
              }
      } )
  }
}

import { Component, OnInit } from '@angular/core';
import {Response} from "../../../interfaces/Response";
import {UserService} from "../../../services/user.service";


@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css']
})
export class OrdersHistoryComponent implements OnInit {

  private orders: any = [];

  constructor(public UserService: UserService) {
  }

  ngOnInit() {

    this.UserService.UserOrders().subscribe((data: Response) => {
      this.orders = data.msg;
      console.log(this.orders);
    })
  }

}

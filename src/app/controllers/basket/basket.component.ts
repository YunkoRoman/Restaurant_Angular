///<reference path="../../../../node_modules/@angular/core/core.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {BasketService} from "../../services/basket.service";
import {Response} from "../../interfaces/Response";
import {FormGroup, FormControl} from "@angular/forms";
import {PaymentService} from "../../services/payment.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  private basketProducts: any = [];
  private quantity: number;
  private nameForm: FormGroup;
  private deleteIcon = require("../../assets/delete.png");
  private arrProductId: any = [];
  private basket: any;

  constructor(
    private BasketService: BasketService,
    private PaymentService: PaymentService
  ) {
  }

  ngOnInit() {
    this.getAllProduct();

    this.nameForm = new FormGroup({
      quantity: new FormControl('', {
        updateOn: 'blur'
      })
    });
  }

  getAllProduct() {

    this.basket = JSON.parse(localStorage.getItem('basket'));

    const id = Object.keys(this.basket);

    id.map(e => {
      const product_id = Number(e);
      this.arrProductId.push(product_id)
    });

    this.BasketService.readProduct(this.arrProductId).subscribe((data: Response) => {
      this.basketProducts.push(data.msg)
    })
  }


  sendOrder() {
  }


  // This is to pay for the order
  // const handler = (<any> window).StripeCheckout.configure({
  //   key: 'pk_test_GZCLbneEEwGKRuOdCAnzo0YX000LBRrSet',
  //   locate: 'auto',
  //   token:(token: any) => {
  //     if (token) {
  //       const tokenId = token.id;
  //       this.PaymentService.purchase(token).subscribe(data => {
  //         console.log(data);
  //       })
  //     }
  //   }
  //   }
  //   );
  //   handler.open({
  //     amount: 200
  //   });
  //
  // }
  AddQuant(id) {
    this.basket[id]++;
    localStorage.setItem('basket', JSON.stringify(this.basket));

  }

  MinusQuant(id) {
    if (this.basket[id] > 1) {
      this.basket[id]--;
      localStorage.setItem('basket', JSON.stringify(this.basket));
    }
  }

  ChangeQuantity(id) {
    const quantity = this.nameForm.value.quantity;
    if (quantity >= 1) {
      this.basket[id] = quantity;
      localStorage.setItem('basket', JSON.stringify(this.basket));
    } else {
      alert('Quantity must by >= 1 ')
    }
  }

  DeleteProduct(id) {
    const value = this.basketProducts[0].map(obj => {return obj.id});
    const index = value.indexOf(id);
    this.basketProducts[0].splice(index,1);

    delete this.basket[id];

    localStorage.setItem('basket', JSON.stringify(this.basket));
  }
}

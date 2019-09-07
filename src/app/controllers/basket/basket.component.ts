///<reference path="../../../../node_modules/@angular/core/core.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {BasketService} from "../../services/basket.service";
import {Response} from "../../interfaces/Response";
import {FormGroup, FormControl} from "@angular/forms";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  public basketProducts: any;
  public quantity: any;
  public nameForm: FormGroup;

  constructor(private BasketService: BasketService) {
  }

  ngOnInit() {
    this.BasketService.refreshNeeded$.subscribe(() => {
      this.getAllProduct();
    });
    this.getAllProduct();

    this.nameForm = new FormGroup({
      quantity: new FormControl('', {
        updateOn: 'blur',
      })
    });
  }

  getAllProduct() {
    this.BasketService.readProduct().subscribe((data: Response) => {
      console.log(data.msg);
      this.basketProducts = data.msg;
    })
  }

  addProduct(id, quantity, price) {
    this.BasketService.additionQuantity(id, quantity, price).subscribe((data: Response) => {
      console.log(data.msg);
    })
  }

  subtractionProduct(id, quantity, price) {
    this.BasketService.subtractionQuantity(id, quantity, price).subscribe((data: Response) => {
      console.log(data.msg);
    })
  }



  ChangeQuantity(id, price) {
    const quantity = this.nameForm.value.quantity;
    this.BasketService.addQuantityWhenTouchInput(id, quantity, price).subscribe((data: Response) => {
      console.log(data.msg);
    })
  }

  deleteProduct(id: any) {
    
  }
}

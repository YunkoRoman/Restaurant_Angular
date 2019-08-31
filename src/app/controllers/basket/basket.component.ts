///<reference path="../../../../node_modules/@angular/core/core.d.ts"/>
import {Component, OnInit, DoCheck} from '@angular/core';
import {BasketService} from "../../services/basket.service";
import {Response} from "../../interfaces/Response";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  public basketProducts: any;

  constructor(private BasketService: BasketService) {
  }
  // ngDoCheck(): void {
  //   this.BasketService.readProduct().subscribe((data: Response) => {
  //     console.log(data.msg);
  //     this.basketProducts = data.msg;
  //   })
  // }
  ngOnInit() {
    this.BasketService.readProduct().subscribe((data: Response) => {
      console.log(data.msg);
      this.basketProducts = data.msg;
    })
  }

  addProduct(id, quantity) {
    this.BasketService.additionQuantity(id, quantity).subscribe((data:Response) => {
      console.log(data.msg);
    })
  }

  subtractionProduct() {

  }
}

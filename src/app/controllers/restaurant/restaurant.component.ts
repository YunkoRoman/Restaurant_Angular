import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Response} from "../../interfaces/Response";
import {RestaurantMenuService} from "../../services/restaurant-menu.service";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  public restaurant_id: number;
  public menus: any = [];
  public productsObj: any = [];
  public showBlock: boolean = false;
  public restaurantName: string;


  constructor(private route: ActivatedRoute,
              private RestaurantMenuService: RestaurantMenuService,
              private BasketService: BasketService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.restaurant_id = params.id;
      });
    this.RestaurantMenuService.UploadMenu(this.restaurant_id).subscribe((data: Response) => {
      this.menus = data.msg;
      console.log(data.msg);
      const arr = data.msg;
      arr.forEach(e => {
        this.restaurantName = e.restaurant.name;
      });
    })
  }

  Buy(product_id, price) {
    this.BasketService.addProduct(product_id, price).subscribe((data: Response) => {
      console.log(data.msg);
    })
  }

  UploadProduct(menu_id) {
    this.RestaurantMenuService.UploadProduuct(menu_id).subscribe((data: Response) => {
      this.productsObj = data.msg;
      console.log(data.msg);
      if (data.success === true) this.showBlock = true;

    })
  }

}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Response} from "../../interfaces/Response";
import {RestaurantMenuService} from "../../services/restaurant-menu.service";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  public restaurant_id:number;
  public pizza_menu:any = [];
  constructor(private route: ActivatedRoute,
              private RestaurantMenuService: RestaurantMenuService) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.restaurant_id = params.id;
      });
    this.RestaurantMenuService.UploadPizzaMenu(this.restaurant_id).subscribe((data:Response) => {
      this.pizza_menu = data.msg;
      console.log(this.pizza_menu);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import {ListRestaurantService} from "../../services/list-restaurant.service";
import {Router} from "@angular/router";
import {Response} from "../../interfaces/Response";

@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.css']
})
export class ListRestaurantsComponent implements OnInit {

  restaurantList:any = [];

  constructor(private ListRestaurantService:ListRestaurantService,
              private router:Router) { }

  ngOnInit() {
    this.ListRestaurantService.UploadList().subscribe((data:Response) =>{
      this.restaurantList = data.msg
      console.log(data.msg);
    })
  }

}

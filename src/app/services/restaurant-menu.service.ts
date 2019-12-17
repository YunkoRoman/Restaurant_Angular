import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestaurantMenuService {

  constructor(public http: HttpClient) {
  }



  UploadProduct(id) {
    return this.http.get('http://localhost:3000/restaurants/product/' + id)
  }
  RestaurantInfo(id) {
    return this.http.get('http://localhost:3000/restaurants/info/'+ id)
  }
  GetMenus(id) {
    return this.http.get('http://localhost:3000/restaurants/menu/' + id)
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestaurantMenuService {

  constructor(public http: HttpClient) {
  }

  UploadPizzaMenu(id) {
    return this.http.get('http://localhost:3000/restaurants/pizza/' + id)
  }
}

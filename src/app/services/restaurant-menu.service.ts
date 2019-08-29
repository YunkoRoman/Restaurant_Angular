import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestaurantMenuService {

  constructor(public http: HttpClient) {
  }

  UploadMenu(id) {
    return this.http.get('http://localhost:3000/restaurants/' + id)
  }

  UploadProduuct(id) {
    return this.http.get('http://localhost:3000/restaurants/product/' + id)
  }
}

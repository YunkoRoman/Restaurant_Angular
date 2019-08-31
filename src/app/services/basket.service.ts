import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(public http: HttpClient) { }

  addProduct(product_id) {
    return this.http.post('http://localhost:3000/basket', {product_id})
  }
  readProduct() {
    return this.http.get('http://localhost:3000/basket')
  }

  additionQuantity(id, quantity) {
    return this.http.put('http://localhost:3000/basket/addition', {id, quantity})
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public http: HttpClient) {
  }


  OrderProduct(products_id: number, restaurant_id: number) {
    return this.http.post('http://localhost:3000/order/', [products_id, restaurant_id])
  }

  SaveOrder(order:any, restaurant_id: number, totalPrice: number, table_numb: number, pay_method:string) {
    return this.http.post('http://localhost:3000/order/save', {orders: order, restaurant_id, totalPrice, table_numb, pay_method})
  }

}

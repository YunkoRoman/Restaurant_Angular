import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http: HttpClient) {
  }

  GetProduct(menu_id) {
    return this.http.get('http://localhost:3000/restaurants/products/' + menu_id)
  }
}

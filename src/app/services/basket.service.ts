import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs/internal/Subject";


@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor(public http: HttpClient) {
  }



  readProduct(MassiveProduct_id) {
    return this.http.post('http://localhost:3000/basket', MassiveProduct_id)
  }
  sendOrder(id) {
    return this.http.post('http://localhost:3000/basket/order', id )
  }
}

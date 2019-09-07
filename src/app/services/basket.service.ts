import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs/internal/Subject";
import {tap} from "rxjs/operators";

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

  addProduct(product_id, price) {
    return this.http.post('http://localhost:3000/basket', {product_id, price})
  }

  readProduct() {
    return this.http.get('http://localhost:3000/basket')
  }

  additionQuantity(id, quantity, price) {
    return this.http
      .put('http://localhost:3000/basket/addition', {id, quantity, price})
      .pipe(tap(() => {
        this._refreshNeeded$.next();
      }))
  }
  subtractionQuantity(id, quantity, price) {
    return this.http
      .put('http://localhost:3000/basket/subtraction', {id, quantity, price})
      .pipe(tap(() => {
        this._refreshNeeded$.next();
      }))
  }
  addQuantityWhenTouchInput(id, quantity, price) {
    return this.http
      .put('http://localhost:3000/basket', {id, quantity, price})
      .pipe(tap(() => {
        this._refreshNeeded$.next();
      }))
  }
}

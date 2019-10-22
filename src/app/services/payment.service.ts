import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(public http: HttpClient) { }

  purchase(tokenId){
    return this.http.post('http://localhost:3000/purchase', tokenId )
  }
}

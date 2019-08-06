import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListRestaurantService {

  constructor(public http: HttpClient) {
  }

  UploadList() {
     return this.http.get('http://localhost:3000/restaurants')
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from '../constants/appSettings'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) {
  }

  UserOrders() {
    return this.http.get(`${AppSettings.API}/user/orders`)
  }

  OrdersStatistics() {
    return this.http.get(`${AppSettings.API}/user/statistic`)
  }

  FilterOnRest(res_id) {
    return this.http.get(`${AppSettings.API}/user/filter/${res_id}`)
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from '../constants/appSettings'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  UserOrders(){
    return this.http.get(`${AppSettings.API}/user/orders`)
  }
}

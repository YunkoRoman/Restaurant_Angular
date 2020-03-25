import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from '../constants/appSettings'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) {
  }

  loginUser(email, password) {
    return this.http.post('http://localhost:3000/auth', {email, password});
  }

  checkUser() {
    return this.http.get(`${AppSettings.API}/auth/check`)
  }
}


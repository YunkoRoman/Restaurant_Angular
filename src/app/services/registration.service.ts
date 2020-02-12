import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(public http: HttpClient) { }

  RegistrUser(name, surname, email, password) {
    return this.http.post('http://localhost:3000/register', {name, surname, email, password});
  };
  CheckedUser(token){
    return this.http.post('http://localhost:3000/register/checked', {token})
  };
}

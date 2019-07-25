import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegistrrationService {

  constructor(public http: HttpClient) { }

  RegistrUser(name, surname, email, password) {
    return this.http.post('http://localhost:3000/user/registration', {name, surname, email, password});
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(public http: HttpClient) { }

  RegistrUser(form) {
    return this.http.post('http://localhost:3000/register', {form});
  };
  CheckedUser(token){
    return this.http.post('http://localhost:3000/register/checked', {token})
  };

}

import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private AuthService: AuthService,
              ) { }

  ngOnInit() {
  }

    sendForm(loginForm:NgForm) {
    console.log(loginForm.value.email);
      this.AuthService.loginUser(loginForm.value.email, loginForm.value.password).subscribe((data: Response) => {
      })
  }
}

import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Response} from "../interfaces/Response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private AuthService: AuthService,
              private router:Router) { }

  ngOnInit() {
  }

    sendForm(loginForm:NgForm) {
      this.AuthService.loginUser(loginForm.value.email, loginForm.value.password).subscribe((data: Response) => {
        localStorage.setItem('token', data.msg);
        if (data.success == true) this.router.navigate([''])
      })
  }
}

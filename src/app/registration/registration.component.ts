import { Component, OnInit } from '@angular/core';
import {RegistrrationService} from "../services/registrration.service";
import {NgForm} from "@angular/forms";
import {Response} from "../interfaces/Response";
import {Router} from "@angular/router";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private RegistrService: RegistrrationService,
              private router:Router) { }

  ngOnInit() {
  }
  sendForm(loginForm:NgForm) {
    if (loginForm.value.password === loginForm.value.password2) {
    this.RegistrService.RegistrUser(loginForm.value.name, loginForm.value.surname,loginForm.value.email, loginForm.value.password)
      .subscribe((data:Response)=>{
        if (data.success == true) alert('Ви успішно зареєструвались');
        this.router.navigate(['']);

      })} else alert('НІТ')
  }
}

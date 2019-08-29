import { Component, OnInit } from '@angular/core';
import {RegistrationService} from "../../services/registration.service";
import {NgForm} from "@angular/forms";
import {Response} from "../../interfaces/Response";
import {Router} from "@angular/router";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private RegistrService: RegistrationService,
              private router:Router) { }

  ngOnInit() {
  }
  sendForm(loginForm:NgForm) {
    if (loginForm.value.password === loginForm.value.password2) {
    this.RegistrService.RegistrUser(loginForm.value.name, loginForm.value.surname,loginForm.value.email, loginForm.value.password)
      .subscribe((data: Response) =>{

        if (data.success == true) {alert('Ви успішно зареєструвались');
          this.router.navigate(['email'])}
        if (data.success == false) alert(data.msg);

      },
      (err:any) => {
        alert (err.error.msg);
      }
      )}
      if (loginForm.value.password != loginForm.value.password2) {
      alert('Поролі не співпадають')
      }

  }
}

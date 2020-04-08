import {Component, OnInit} from '@angular/core';
import {RegistrationService} from "../../services/registration.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Response} from "../../interfaces/Response";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {passValidator} from '../../validator';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(private RegistrService: RegistrationService,
              private router: Router,
              private fb: FormBuilder) {

    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      surname: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", Validators.compose([Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: "",
      repPasw: ['', passValidator ],
    });



  }

  ngOnInit() {

  }

  onSubmit() {
    if (this.form.valid && this.form.value.password !=='') {

      this.RegistrService.RegistrUser(this.form.value)
        .subscribe(
          (data: Response) =>{

            if (data.success == true) {alert('Ви успішно зареєструвались');
            this.router.navigate(['email'])}
        },
          err => {
            if (err){
              alert(err.error.message)
            }
          }

        )
    }
    if (this.form.invalid && this.form.value.password =='') {
      alert('You should fill out correctly this form')
    }
  }

}

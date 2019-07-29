import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RegistrationService} from "../services/registration.service";
import {Response} from "../interfaces/Response";


@Component({
  selector: 'app-checked',
  templateUrl: './checked.component.html',
  styleUrls: ['./checked.component.css']
})
export class CheckedComponent implements OnInit {
  public orderObj: any;


  constructor(private route: ActivatedRoute,
              private RegistrationService: RegistrationService) { }

  ngOnInit() {
    this.route.queryParamMap
      .subscribe(params => {
        this.orderObj = params;
      });
    this.RegistrationService.CheckedUser(this.orderObj.params.t).subscribe((data:Response) => {
      console.log(data.msg);
    })

  }



}

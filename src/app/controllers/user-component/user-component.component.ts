import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Response} from "../../interfaces/Response"

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {
  private defaultPhoto = require('../../assets/defaultIcon.png');


  constructor(public UserService: UserService) {
  }

  ngOnInit() {

  }

}

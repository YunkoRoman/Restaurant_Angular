///<reference path="../../node_modules/@types/node/index.d.ts"/>
import {Component, DoCheck} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})


export class AppComponent implements DoCheck {
  public visio: boolean;
  public visioIcon: boolean;

  public icon = require("./assets/icon1.png");


  constructor() {

  }

  ngDoCheck(): void {
    if (localStorage.getItem('token')) {
      this.visio = false
    }
    if (!localStorage.getItem('token')) {
      this.visio = true
    }
    if (localStorage.getItem('token')) {
      this.visioIcon = true
    }
    if (!localStorage.getItem('token')) {
      this.visioIcon = false
    }


  }


  exiteBtn() {
    localStorage.removeItem('token')
  }
}

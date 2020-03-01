import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Response} from "../../../interfaces/Response";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  private statisticsList: any = [];
  private statisticsList2: any = [];
  private restList: any = [];
  private showRestFilt: boolean = false;

  constructor(public UserService: UserService
  ) {
  }

  ngOnInit() {
    this.UserService.OrdersStatistics().subscribe((data: Response) => {
      this.statisticsList2 = data.msg;
      this.statisticsList = data.msg;
      console.log(data.msg);
    });
  }


  getFormResList() {

    this.showRestFilt = this.showRestFilt === false;

    if (this.restList.length === 0) {
      this.statisticsList2.forEach(e => {
        let existing = this.restList.filter(v => {
          return v.name === e.restaurant.name
        });
        if (!existing.length) {
          this.restList.push(e.restaurant)
        }
      })
    }
  }

  choseOneRes(res_id: number) {
    this.statisticsList2 = [];
    for (let i = 0; i < this.statisticsList.length; i++) {
      if (this.statisticsList[i].restaurant.id === res_id) {
        this.statisticsList2.push(this.statisticsList[i])
      }

    }
  }
}

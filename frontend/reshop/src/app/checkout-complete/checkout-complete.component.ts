import { Component, OnInit } from '@angular/core';
import {MockService} from "../mock.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout-complete',
  templateUrl: './checkout-complete.component.html',
  styleUrls: ['./checkout-complete.component.scss']
})
export class CheckoutCompleteComponent implements OnInit {

  constructor(private mockService:MockService, private router:Router) { }

  activeUser: any;
  nextDate?: Date;

  ngOnInit(): void {
    this.activeUser = this.mockService.getActiveUser();

    let d = new Date();
    d = this.addDays(d, this.activeUser.periodicity );

    this.nextDate = d;
  }

  addDays(date: Date, days:number) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

}

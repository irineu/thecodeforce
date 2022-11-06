import { Component, OnInit } from '@angular/core';
import {MockService} from "../mock.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-checkout-complete',
  templateUrl: './checkout-complete.component.html',
  styleUrls: ['./checkout-complete.component.scss']
})
export class CheckoutCompleteComponent implements OnInit {

  constructor(private mockService:MockService, private router:Router, private route:ActivatedRoute) { }

  activeUser: any;
  nextDate?: Date;

  ngOnInit(): void {
    this.mockService.getActiveUser(this.route.snapshot.params['id']).subscribe((user) => {
      this.activeUser = user;

      let d = new Date();
      d = this.addDays(d, this.activeUser.periodicity );

      this.nextDate = d;
    });


  }

  addDays(date: Date, days:number) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

}

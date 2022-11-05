import { Component, OnInit } from '@angular/core';
import {MockService} from "../mock.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private mockService:MockService) { }

  activeUser: any;

  ngOnInit(): void {
    this.activeUser = this.mockService.getActiveUser();
  }

}

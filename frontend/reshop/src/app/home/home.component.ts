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

  productToSearch = "";
  searchList:any[] = []


  ngOnInit(): void {
    this.activeUser = this.mockService.getActiveUser();
  }

  onSearchChange() {

    if(this.productToSearch.length <= 3){
      this.searchList = []
    }else{
      // @ts-ignore
      this.searchList = this.mockService.search(this.productToSearch);
    }

  }
}

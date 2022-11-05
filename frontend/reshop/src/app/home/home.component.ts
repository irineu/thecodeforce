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

  productList:any[] = [];


  ngOnInit(): void {
    this.activeUser = this.mockService.getActiveUser();
  }

  onSearchChange() {

    if(this.productToSearch.length <= 2){
      this.searchList = []
    }else{
      // @ts-ignore
      this.searchList = this.mockService.search(this.productToSearch);
    }

  }

  addProduct(product: any) {
    this.productToSearch = "";
    this.productList.push({
      product: product,
      amount: 1
    });
  }

  increaseAmount(p: any) {
    p.amount++;
  }

  decreaseAmount(p: any) {
    if(p.amount == 1){
      if(confirm("Deseja remove este item da sua cesta?")){
        let index = this.productList.findIndex(p2 => p2.product == p.product);
        this.productList.splice(index, 1);
      }
    }else{
      p.amount--;
    }

  }

  getTotal() {
    let total = 0;
    this.productList.forEach(p => {
      total += p.product.price * p.amount;
    });
    return total;
  }
}

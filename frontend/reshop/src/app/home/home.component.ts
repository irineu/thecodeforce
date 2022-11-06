import { Component, OnInit } from '@angular/core';
import {MockService} from "../mock.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private mockService:MockService, private router:Router) { }

  activeUser: any;

  productToSearch = "";
  searchList:any[] = []


  nextPurchase: string = '';

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
    this.activeUser.productList.push({
      product: product,
      amount: 1
    });

    this.updateNextPurchase();
  }

  increaseAmount(p: any) {
    p.amount++;
    this.updateNextPurchase();
  }

  decreaseAmount(p: any) {
    if(p.amount == 1){
      if(confirm("Deseja remove este item da sua cesta?")){
        let index = this.activeUser.productList.findIndex((p2:any) => p2.product == p.product);
        this.activeUser.productList.splice(index, 1);
      }
    }else{
      p.amount--;
    }
    this.updateNextPurchase();
  }

  addDays(date: Date, days:number) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  updateNextPurchase(){

    let totalDays: any[] = [];

    if(!this.activeUser.lastPurchase){
      this.activeUser.productList.forEach((p:any) => {
        totalDays.push(p.amount * p.product.avgDuration);
      });

      const sum = totalDays.reduce((a, b) => a + b, 0);
      const avg = (sum / totalDays.length) || 0;

      this.activeUser.periodicity = avg;

      let d = new Date();
      d = this.addDays(d, avg);

      this.nextPurchase = [d.getFullYear(), (d.getMonth()+1).toString().padStart(2, "0"), d.getDate().toString().padStart(2, "0")].join("-");
    }
  }

  getTotal() {
    let total = 0;
    this.activeUser.productList.forEach((p:any) => {
      total += p.product.price * p.amount;
    });
    return total;
  }


  buyNow() {
    if(confirm("Desaja proceder para o checkout?")){
      this.mockService.save(this.activeUser.productList, this.activeUser.periodicity);
      this.router.navigate(['checkout']);
    }

  }
}

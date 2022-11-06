import { Component, OnInit } from '@angular/core';
import {MockService} from "../mock.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private mockService:MockService, private http:HttpClient, private router:Router, private route:ActivatedRoute) { }

  activeUser: any;

  productToSearch = "";
  searchList:any[] = []


  nextPurchase: string = '';

  ngOnInit(): void {
    this.mockService.getActiveUser(this.route.snapshot.params['id']).subscribe((user) => {
      this.activeUser = user;
    })
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
    this.activeUser.list.products.push({
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
        let index = this.activeUser.list.products.findIndex((p2:any) => p2.product == p.product);
        this.activeUser.list.products.splice(index, 1);
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
      this.activeUser.list.products.forEach((p:any) => {
        totalDays.push(p.amount * p.product.avgDuration);
      });

      const sum = totalDays.reduce((a, b) => a + b, 0);
      const avg = (sum / totalDays.length) || 0;

      this.activeUser.periodicity = avg;

      let d = new Date();
      d = this.addDays(d, avg);

      this.activeUser.list.dateNext = [d.getFullYear(), (d.getMonth()+1).toString().padStart(2, "0"), d.getDate().toString().padStart(2, "0")].join("-");

      this.http.patch("https://codeforce-shopping.herokuapp.com/list", this.activeUser.list).subscribe((res) => {
        console.log(res);
      });
    }
  }

  getTotal() {
    let total = 0;
    this.activeUser.list.products.forEach((p:any) => {
      total += p.product.price * p.amount;
    });
    return total;
  }


  buyNow() {
    if(confirm("Desaja proceder para o checkout?")){
      this.mockService.save(this.activeUser.list.products, this.activeUser.periodicity);
      this.router.navigate(['checkout', this.activeUser.documentNumber]);
    }

  }
}

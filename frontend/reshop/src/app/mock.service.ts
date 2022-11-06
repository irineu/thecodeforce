import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor(private http:HttpClient) {
    http.get("https://codeforce-product.herokuapp.com/product").subscribe((data:any) => {
      console.log(data);
      this.products = data;
    });
  }

  products = []

  platformMock = {
    "linkedin" : {
      name: "Irineu Antunes",
      address: {
        addrLine1: "Rua XPTO, 161",
        addrLine2: "apto 34",
        city: "São Paulo",
        state: "SP",
        zip: "12345-000"
      },
      productList: [],
      lastPurchase: null,
      periodicity: null
    }
  }

  activeUser: any = null;

  mockUserFrom(platform: string) {
    // @ts-ignore
    this.activeUser = this.platformMock[platform];
  }

  getActiveUser() {
    if(!this.activeUser){
      this.activeUser = this.platformMock["linkedin"];
    }

    return this.activeUser;
  }

  search(productToSearch: string) {
    return this.products.filter(p => {
      // @ts-ignore
      return p.name.toLowerCase().indexOf(productToSearch.toLowerCase()) > -1 || p.type.toLowerCase().indexOf(productToSearch.toLowerCase()) > -1
    });
  }

  save(productList: any[], avg: number) {
    this.activeUser.productList = productList;
    this.activeUser.lastPurchase = new Date();
    this.activeUser.periodicity = avg;
  }
}

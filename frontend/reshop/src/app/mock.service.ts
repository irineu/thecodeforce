import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {observable, Observable} from "rxjs";

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

  products: any[] = []

  platformMock = {
    "linkedin" : '00000000001',
    "facebook" : '00000000002',
    "google" : '00000000003'
  }

  activeUser: any = null;

  mockUserFrom(platform: string) {
    // @ts-ignore

    let userDoc = this.platformMock[platform];

    /*
    * "linkedin" : {
      address: {
        addrLine1: "Rua XPTO, 161",
        addrLine2: "apto 34",
        city: "São Paulo",
        state: "SP",
        zip: "12345-000"
      },
      lastPurchase: null,
      periodicity: null
    }
    * */

    return new Observable((observable) => {
      this.fetchUser(userDoc).subscribe((user:any) => {
        observable.next(this.activeUser.documentNumber);
      });
    })

  }

  getActiveUser(document:any) {

    return new Observable((observable) => {
      if(!this.activeUser){
        this.fetchUser(document).subscribe((user:any) => {
          observable.next(this.activeUser);
        });
      }else{
        observable.next(this.activeUser);
      }
    });
  }

  search(productToSearch: string) {
    return this.products.filter(p => {
      // @ts-ignore
      return p.name.toLowerCase().indexOf(productToSearch.toLowerCase()) > -1 || p.type.toLowerCase().indexOf(productToSearch.toLowerCase()) > -1
    });
  }

  save(productList: any[], avg: number) {
    this.activeUser.list.products = productList;
    this.activeUser.lastPurchase = new Date();
    this.activeUser.periodicity = avg;
  }

  fetchUser(document:any){
    return new Observable((observable) => {
      this.http.get(`https://codeforce-client.herokuapp.com/client/${document}`).subscribe((user:any) => {
        this.http.get(`https://codeforce-shopping.herokuapp.com/list/${document}`).subscribe((productList:any) => {
          this.http.get(`https://codeforce-address.herokuapp.com/address/${user.addressId}`).subscribe((address:any) => {
            productList.products =  productList.products.map((p:any) => {
              let p3 = this.products.find((p2:any) => p2.id == p.product.id);
              p.product = p3;
              return p;
            });
            user.address = address;
            user.list = productList;
            user.name = user.firstName + ' ' + user.lastName;
            this.activeUser = user;
            observable.next(user);
          });
        });
      });
    })
  }

  mockSignup() {
    return new Observable((observable) => {
      let firstName = prompt('Digite seu primeiro nome');
      let lastName = prompt('Digite seu sobrenome');
      let doc = new Date().getTime().toString();

      this.http.post("https://codeforce-client.herokuapp.com/client", {
        "firstName": firstName,
        "lastName": lastName,
        "documentNumber": doc,
        "documentType":"CPF",
        "email":"aceitei@getnet.com.br",
        "addressId":"6367d4a5cc851c27f7d3fa75",
        "phone":"5551999887766"
      }).subscribe((res) => {

        this.http.post("https://codeforce-shopping.herokuapp.com/list", {
          "clientId" : doc,
          "dateNext" : "2022-12-31",
          "products" : []
        }).subscribe((res) => {
          observable.next(doc);
        });
      });
    });

  }
}

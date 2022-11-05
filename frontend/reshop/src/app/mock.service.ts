import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() { }

  products = [
    //Papel Toalha
    {
      name: 'Papel Toalha',
      brand: 'Kitchen',
      type: 'Papel Toalha',
      units: 2,
      avgUnitDuration: 5
    },
    {
      name: 'Papel Toalha',
      brand: 'Qualitá',
      type: 'Papel Toalha',
      units: 3,
      avgUnitDuration: 5
    },

    //Café
    {
      name: 'Café Tradicional',
      brand: 'Três Corações',
      type: 'Café',
      units: 1,
      avgUnitDuration: 15
    },
    {
      name: 'Café Extra Forte',
      brand: 'Três Corações',
      type: 'Café',
      units: 1,
      avgUnitDuration: 15
    },
    {
      name: 'Café Tradicional',
      brand: 'Três Pelé',
      type: 'Café',
      units: 1,
      avgUnitDuration: 15
    },

    //Desinfetante
    {
      name: 'Desinfetante Lavanda 1l',
      brand: 'Pinho',
      type: 'Desinfetante',
      units: 1,
      avgUnitDuration: 5
    },
    {
      name: 'Desinfetante Lavanda 2l',
      brand: 'Pinho',
      type: 'Desinfetante',
      units: 1,
      avgUnitDuration: 10
    }
  ]

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
      periodicity: '30d'
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
      return p.name.toLowerCase().indexOf(productToSearch.toLowerCase()) > -1 || p.type.toLowerCase().indexOf(productToSearch.toLowerCase()) > -1
    });
  }
}

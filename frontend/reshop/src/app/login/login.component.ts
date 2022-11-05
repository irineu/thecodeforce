import { Component, OnInit } from '@angular/core';
import {MockService} from "../mock.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private mockService:MockService, private router:Router) { }

  ngOnInit(): void {
  }

  loginWithSSO(platform:string){
    this.mockService.mockUserFrom(platform);
    this.router.navigate(['home']);
  }

}

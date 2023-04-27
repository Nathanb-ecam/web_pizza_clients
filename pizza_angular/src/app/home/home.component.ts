import { Component,ViewChild } from '@angular/core';
import { SigninCardComponent } from '../signin-card/signin-card.component';
import { AdminService, User } from '../admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild(SigninCardComponent) signinCard: any;
  

  username:string=''
  password:string=''
  

  constructor(private adminService : AdminService){

  }
  login(){
    let user:User = {"name":this.signinCard.username,"password":this.signinCard.password}
    console.log(user);
  }
}
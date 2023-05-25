import { Component,ViewChild } from '@angular/core';
import { SigninCardComponent } from '../signin-card/signin-card.component';
import { AdminService, User } from '../admin.service';
import { Router } from '@angular/router';
import { DataSharingServiceService } from '../data-sharing-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild(SigninCardComponent) signinCard: any;
  

  username:string=''
  password:string=''
  

  constructor(
    private router : Router,
    private adminService : AdminService,
    private sharedData : DataSharingServiceService,
    ){

  }
  login(){
    let user :User = {"name":this.signinCard.username,"password":this.signinCard.password}
    this.adminService.login(user).subscribe(
      data => {
        console.log("Login status");
        console.log(data);
        if(data){
          this.sharedData.setUser(user);
          this.sharedData.setToken(data);
          this.router.navigate(['menu'])
        }



      }
    )
  }
}
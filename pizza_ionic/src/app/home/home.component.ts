import { Component,ViewChild } from '@angular/core';
import { SigninCardComponent } from '../signin-card/signin-card.component';
import { AdminService, User } from '../admin.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild(SigninCardComponent) signinCard: any;
  

  username:string=''
  password:string=''
  

  constructor(
    private router : Router,
    private adminService : AdminService,
    private sharedData : DataSharingService,
    ){

  }
  login(){
    console.log("DEBUGGING")
    if (this.signinCard.username != '' && this.signinCard.password != ''){
      let user :User = {"name":this.signinCard.username,"password":this.signinCard.password}
      console.log(user)
      this.make_login_request(user)
    }
    else{
      console.log("Veuillez remplir tous les champs du formulaire")
    }
  }

  make_login_request(user:User){
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




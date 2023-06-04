import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';
import { SigninCardComponent } from '../signin-card/signin-card.component';
import { AdminService, Token, User } from '../admin.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  isAdmin:boolean=false;
  signedIn:boolean=false;
  token:Token=new Token()

  // retreive child component properties : username and password
  @ViewChild(SigninCardComponent) signinCard: any;

  constructor( 
    private sharedData : DataSharingService,
    private adminService : AdminService
    ) { }

  ngOnInit() {
    this.checkSignedIn()
  }


  login(){
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
        this.token = data;
        console.log(this.token);
        this.signedIn=true;
        this.isAdmin= data.isAdmin;
        console.log("isAdmin"+ this.isAdmin)

      }
    )
  }

  checkSignedIn(){
    let sharedUser  = this.sharedData.getUser();
    console.log("sharedUser",sharedUser)
    if(sharedUser != null){
      this.signedIn= true
    }
  }

}

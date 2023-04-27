import { Component, Input } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-signin-card',
  templateUrl: './signin-card.component.html',
  styleUrls: ['./signin-card.component.css']
})
export class SigninCardComponent {
  username:string='';
  password:string='';


  constructor(private adminService :AdminService){

    
  }


  login(){
    console.log(this.username +this.password);
    
  }
}

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent {
  username:string='';
  password:string='';
  constructor(private _fb:FormBuilder){

    
  }


  onFormSubmit(){
    
    console.log(this.username +this.password);
    
  }
}

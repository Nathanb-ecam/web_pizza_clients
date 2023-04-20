import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export class Pizza{
  "name":string;
  "price":number;
  "desc":string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  base_url ="http://pat.infolab.ecam.be:60836/api"
  constructor(private http :HttpClient) { 

  }

  // login(){
  //   return this.http.post(this.base_url+"/login")
  // }

  // getPizzas():Observable<any>{
  //   return this.http.get(this.base_url+"/pizzas")
  // }

}

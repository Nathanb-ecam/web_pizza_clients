import { HttpClient,HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product} from './restaurant.service';


let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': "Bearer tokenToReplace"
  })
};

export class User{
  "name":string;
  "password":string;
}



export class Menu{
  "menu_id":number;
  "idSauce":number;
  "idChicken":number;
  "idPizza":number;
  "idDrink":number;
}

export class OrderExtra{
  "idOrderExtra":number;
  "idOrder":number;
  "idExtraDrink":number;
  "idExtraPizza":number;
  "idExtraChicken":number;
  "idExtraSauce":number;
}

export class Client{
  "user_id":number;
  "name":string;
  "password":string;
  "isAdmin":boolean;
  "points":number;
}

export class Token{
  "token":string;
  "maxAge":number;
  "isAdmin":boolean;
}



@Injectable({
  providedIn: 'root'
})
export class AdminService {
  base_url ="http://pat.infolab.ecam.be:60836/api"

  constructor(private http :HttpClient) { 

  }

  login(user: User): Observable<Token> {
    return this.http.post<Token>(this.base_url+"/login",user);
  }


  getMenus():Observable<any>{
    return this.http.get<Menu>(this.base_url+"/menus")
  }
  getClients(token:string):Observable<any>{
    let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`)
    return this.http.get(this.base_url+"/users",{headers:headers})
  }

  getOrderExtras(token:string):Observable<any>{
    let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`)
    return this.http.get<OrderExtra>(this.base_url+"/orderextras",{headers:headers})
  }

}

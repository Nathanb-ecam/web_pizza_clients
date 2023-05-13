import { HttpClient,HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Menu, Product} from './restaurant.service';


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



export class MenuEntity{
  "menu_id":number;
  "idSauce":number;
  "idChicken":number;
  "idPizza":number;
  "idDrink":number;
}



export class MenuExplicit{
  "menu_id":number;
  "Pizza":Product;
  "Drink":Product;
  "Sauce":Product;
  "Chicken":Product;
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
  local_url ="http://localhost:80/api"

  constructor(private http :HttpClient) { 

  }

  login(user: User): Observable<Token> {
    return this.http.post<Token>(this.local_url+"/login",user);
  }


  // MENU SECTION 
  getMenusExplicit(token:string):Observable<any>{
    let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`)
    return this.http.get<MenuExplicit>(this.local_url+"/menusExplicit",{headers:headers})
  }
  addMenu(menu:Menu,token:string){
    let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`)
    return this.http.post(this.local_url+`/menus`,menu,{headers:headers})
  }
  deleteMenu(id:number,token:string){
    let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`)
    return this.http.delete(this.local_url+`/menu/${id}`,{headers:headers})
  }



  getClients(token:string):Observable<any>{
    let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`)
    return this.http.get(this.local_url+"/users",{headers:headers})
  }

  getOrderExtras(token:string):Observable<any>{
    let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`)
    return this.http.get<OrderExtra>(this.local_url+"/orderextras",{headers:headers})
  }

}

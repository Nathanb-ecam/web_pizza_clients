import { HttpClient,HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Menu, Product, ProductDto} from './restaurant.service';


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

export class Order{
  "order_id":number;
  "user_id":number;
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
  "user_id":number;
}



@Injectable({
  providedIn: 'root'
})
export class AdminService {
  base_url ="https://pat.infolab.ecam.be:64336/api"
  local_url ="http://localhost:3000/api"

  constructor(private http :HttpClient) { 

  }

  login(user: User): Observable<Token> {
    return this.http.post<Token>(this.base_url+"/login",user);
  }


  // MENU SECTION 
  getMenusExplicit(token:string):Observable<MenuExplicit[]>{
    let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`)
    return this.http.get<MenuExplicit[]>(this.base_url+"/menusExplicit",{headers:headers})
  }
  addMenu(menu:Menu,token:string){
    let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`)
    return this.http.post(this.base_url+`/menus`,menu,{headers:headers})
  }
  modifyMenu(menu:Menu,id:number,token:string){
    let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`)
    return this.http.put(this.base_url+`/menu/${id}`,menu,{headers:headers})
  }


  // PIZZA SECTION
  getPizzas(token:string):Observable<Product[]>{
    let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`)
    return this.http.get<Product[]>(this.base_url+"/pizzas",{headers:headers})
  }
  addPizza(pizza:ProductDto,token:string){
    let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`)
    return this.http.post(this.base_url+`/pizzas`,pizza,{headers:headers})
  }
  modifyPizza(pizza:ProductDto,id:number,token:string){
    let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`)
    return this.http.put(this.base_url+`/pizza/${id}`,pizza,{headers:headers})
  }
  
  deletePizza(id:number,token:string){
    let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`)
    return this.http.delete(this.base_url+`/pizza/${id}`,{headers:headers})
  }

  deletePizzaDependencies(idPizza:number,token:string){
    let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`)
    return this.http.delete(this.base_url+`/pizzaDependencies/${idPizza}`,{headers:headers})
  }


  // client SECTION
  getClients(token:string):Observable<Client[]>{
    let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`)
    return this.http.get<Client[]>(this.base_url+"/users",{headers:headers})
  }

  // order SECTION
  getOrderExtras(token:string):Observable<any>{
    let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`)
    return this.http.get<OrderExtra>(this.base_url+"/orderextras",{headers:headers})
  }

}

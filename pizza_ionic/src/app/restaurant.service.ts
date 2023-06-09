import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './admin.service';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': "Bearer tokenToReplace"
  })
};

export class Product{
  "id":any;
  "name":string;
  "price":number;
  "desc":string;
}

export class Menu{  
  "idSauce":number;
  "idChicken":number;
  "idPizza":number;
  "idDrink":number;

}

export class ElementOrder{
  "idOrder":number;
  "idMenu":number;
}

export class OrderExtra{
  "idOrder":number;
  "idExtraDrink":number;
  "idExtraPizza":number;
  "idExtraChicken":number;
  "idExtraSauce":number;
}

export enum ProductType{
  pizza,
  drink,
  chicken,
  sauce
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  base_url = "https://pat.infolab.ecam.be:64336/api"
  local_url ="http://localhost:80/api"

  cartMenu: any = [];
  cartExtra: any = [];

  constructor(private http : HttpClient) {

   }

  // get all pizzas
  getPizzas():Observable<any>{
    return this.http.get(this.base_url+"/pizzas")
  }

   // get all drinks
  getDrinks():Observable<any>{
    return this.http.get(this.base_url+"/drinks")
  }

  // get all chickens
  getChickens():Observable<any>{
    return this.http.get(this.base_url+"/chickens")
  }

  // get all extras
  getExtras():Observable<any>{
    return this.http.get(this.base_url+"/extras")
  }

  // get all sauces
  getSauces():Observable<any>{
    return this.http.get(this.base_url+"/sauces")
  }

  //add a new menu to DB
  addMenu(menu:Menu,token:string):Observable<any>{
    let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`);
    return this.http.post(this.base_url+"/menus",menu,{headers:headers});
  }

  //get all orders
  getOrders():Observable<any>{
    return this.http.get(this.base_url+"/orders")
  }

  //add a new order to DB
  addOrder(userId:number,token:string):Observable<Order>{
    let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`);
    return this.http.post<Order>(this.base_url+`/orders/${userId}`,{},{headers:headers});
  }

  //add a new elementorder to DB
 addElementOrder(ElementOrder:ElementOrder,token:string):Observable<any>{
  let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`);
  return this.http.post(this.base_url+"/orderelements",ElementOrder,{headers:headers});
 }

 //add a new orderextra to DB
 addOrderExtra(OrderExtra:OrderExtra,token:string):Observable<any>{
  let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`);
  return this.http.post(this.base_url+"/orderextras",OrderExtra,{headers:headers});
 }


}

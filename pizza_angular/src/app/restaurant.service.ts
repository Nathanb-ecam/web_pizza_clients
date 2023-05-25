import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Product{
  "id":number;
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

export enum ProductType{
  pizza,
  drink,
  chicken,
  sauce
}

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': "Bearer tokenToReplace"
  })
};

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

  // Pizza crud 
  getPizzas():Observable<any>{
    return this.http.get(this.base_url+"/pizzas")
  }

  getDrinks():Observable<any>{
    return this.http.get(this.base_url+"/drinks")
  }
  getChickens():Observable<any>{
    return this.http.get(this.base_url+"/chickens")
  }
  getExtras():Observable<any>{
    return this.http.get(this.base_url+"/extras")
  }
  getSauces():Observable<any>{
    return this.http.get(this.base_url+"/sauces")
  }

  addMenu(menu:Menu):Observable<any>{
    return this.http.post(this.base_url+"/menus",menu);
  }

  getOrders():Observable<any>{
    return this.http.get(this.base_url+"/orders")
  }

  addOrder(userId:number,token:string):Observable<any>{
    let headers = httpOptions.headers.set("Authorization",`Bearer ${token}`);
    return this.http.post(this.base_url+`/orders/${userId}`,{headers:headers});
  }

}

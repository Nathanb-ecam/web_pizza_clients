import { HttpClient } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  base_url = "http://pat.infolab.ecam.be:60836/api"
  local_url ="http://localhost:80/api"

  cart: any = [];

  constructor(private http : HttpClient) {

   }

  // Pizza crud 
  getPizzas():Observable<any>{
    return this.http.get(this.local_url+"/pizzas")
  }

  getDrinks():Observable<any>{
    return this.http.get(this.local_url+"/drinks")
  }
  getChickens():Observable<any>{
    return this.http.get(this.local_url+"/chickens")
  }
  getExtras():Observable<any>{
    return this.http.get(this.local_url+"/extras")
  }
  getSauces():Observable<any>{
    return this.http.get(this.local_url+"/sauces")
  }

  addMenu(menu:Menu):Observable<any>{
    return this.http.post(this.local_url+"/menus",menu);
  }

  getOrders():Observable<any>{
    return this.http.get(this.local_url+"/orders")
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Product{
  "id":number;
  "name":string;
  "price":number;

}


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  base_url = "http://localhost:3000/api"

  constructor(private http : HttpClient) {

   }


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
}

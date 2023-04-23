import { Component } from '@angular/core';
import { Product,RestaurantService } from '../restaurant.service';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  pizzas:Product[]= [];
  drinks:Product[]= [];
  chickens:Product[]= [];
  sauces:Product[]= [];

  imageUrl:string="";
  constructor(private restauService : RestaurantService){

  }
  ngOnInit(){
    this.fetchAll()
  }

  fetchAll(){
    this.getPizzas()
    this.getChickens()
    this.getDrinks()
    this.getSauces()
  }
  getPizzas(){
    this.restauService.getPizzas().subscribe(
      data => {
        for (const pizza of data) {
          if(pizza.image){
            console.log("BLOB?"+ pizza.image)
            // pizza.image = URL.createObjectURL(pizza.image);
          }
        }
        this.pizzas = data;
        console.log(this.pizzas);
      }
    )
  }
  getChickens(){
    this.restauService.getChickens().subscribe(
      data => {
        this.chickens = data;
        console.log(this.chickens);
      }
    )
  }
  getSauces(){
    this.restauService.getSauces().subscribe(
      data => {
        this.sauces = data;
        console.log(this.sauces);
      }
    )
  }
  getDrinks(){
    this.restauService.getDrinks().subscribe(
      data => {
        this.drinks = data;
        console.log(this.drinks);
      }
    )
  }
}

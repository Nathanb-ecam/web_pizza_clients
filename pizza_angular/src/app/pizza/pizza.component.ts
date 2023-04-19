import { Component } from '@angular/core';
import { Product, RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent {
  pizzas:Product[] = []

  constructor(private restaurantService:RestaurantService){

  }
  ngOnInit(){

  }

  getPizzas(){
    this.restaurantService.getPizzas().subscribe(
      data => {
        this.pizzas = data;
        console.log(this.pizzas);
      }
    )
  }
}

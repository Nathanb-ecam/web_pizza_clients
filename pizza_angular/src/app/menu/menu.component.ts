import { Component } from '@angular/core';
import { Product,RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  pizzas:Product[]= [];
  constructor(private restauService : RestaurantService){

  }
  ngOnInit(){
    this.restauService.getPizzas().subscribe(
      data => {
        this.pizzas = data;
        console.log(this.pizzas);
      }
    )
  }
}

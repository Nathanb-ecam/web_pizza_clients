import { Component } from '@angular/core';
import { Menu, Product,RestaurantService } from '../restaurant.service';




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
  

  selectedPizza:Product=new Product;
  selectedDrink:Product=new Product;
  selectedChicken:Product=new Product;
  selectedSauce:Product=new Product;

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

  addToCart(pizza:Product, drink:Product, chicken:Product, sauce:Product){
    let menu_items:Product[]= [pizza,drink,chicken,sauce];

    for (var item of menu_items){
      if (item.id == undefined) {
        alert('please fill all field !');
        return;
      }
    }

    this.restauService.cart.push(menu_items);
    alert('menu added to cart');
  }

  
}

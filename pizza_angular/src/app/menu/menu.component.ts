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
  

  menuPizza:Product=new Product;
  menuChicken:Product=new Product;
  menuSauce:Product=new Product;
  menuDrink:Product=new Product;
  
  extraDrink:Product=new Product;
  extraChicken:Product=new Product;
  extraSauce:Product=new Product;
  extraPizza:Product=new Product;

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
      }
    )
  }
  getChickens(){
    this.restauService.getChickens().subscribe(
      data => {
        this.chickens = data;
      }
    )
  }
  getSauces(){
    this.restauService.getSauces().subscribe(
      data => {
        this.sauces = data;
      }
    )
  }
  getDrinks(){
    this.restauService.getDrinks().subscribe(
      data => {
        this.drinks = data;
      }
    )
  }

  addMenu(pizza:Product, drink:Product, chicken:Product, sauce:Product){
    let menu_items:any = {pizza:pizza,drink:drink,chicken:chicken,sauce:sauce};
    
    for (var item in menu_items){
      if (menu_items[item].id == undefined) {
        alert('please fill all field !');
        return;
      }
    }

    this.restauService.cart.push(menu_items);
    alert('menu added to cart');
  }

  addExtra(extraInfo:String,extra:Product){
    let all_items  = ["pizza","drink","chicken","sauce"];
    let EmptyExtra : Product = {"id":0,"name":"/","price":0,"desc":""};
    let extra_item:any = {};

    if (extra.id == undefined) {
        alert('please fill this field !');
        return;
    }

    for (var item of all_items){
      if(extraInfo == item){
        extra_item[item] = extra
      }
      else{
        extra_item[item] = EmptyExtra
      }
    }
    this.restauService.cart.push(extra_item);
    alert('menu added to cart');
    
  }
}

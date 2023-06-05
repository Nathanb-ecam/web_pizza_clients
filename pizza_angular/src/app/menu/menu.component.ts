import { Component,ViewChild } from '@angular/core';
import { Product,RestaurantService } from '../restaurant.service';
import { DataSharingServiceService } from '../data-sharing-service.service';
import { User, AdminService} from '../admin.service';
import { SigninCardComponent } from '../signin-card/signin-card.component';

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
  
  @ViewChild(SigninCardComponent) signinCard: any;

  menuPizza:Product=new Product;
  menuChicken:Product=new Product;
  menuSauce:Product=new Product;
  menuDrink:Product=new Product;
  
  extraDrink:Product=new Product;
  extraChicken:Product=new Product;
  extraSauce:Product=new Product;
  extraPizza:Product=new Product;

  signedIn:Boolean=false

  constructor(
    private adminService : AdminService,
    private sharedData : DataSharingServiceService,
    private restauService : RestaurantService
    ){
    console.log("CURREZNT SHARED DATA")
    console.log(this.sharedData)
  }
  ngOnInit(){
    this.automatic_login()
    
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

    this.restauService.cartMenu.push(menu_items);
    alert('menu added to cart');
  }

  make_login_request(user:User){
    this.adminService.login(user).subscribe(
      data => {
        this.signedIn=true;
        this.fetchAll()
        this.sharedData.setUser(user);
        this.sharedData.setToken(data);
      }
    )
  }

  login(){
    if (this.signinCard.username != '' && this.signinCard.password != ''){
      let user :User = {"name":this.signinCard.username,"password":this.signinCard.password}
      this.make_login_request(user)
    }
    else{
      console.log("Veuillez remplir tous les champs du formulaire")
    }

  }

  automatic_login(){
    let sharedUser  = this.sharedData.getUser();
    console.log("sharedUser",sharedUser)
    if (sharedUser != undefined){
      let user:User = {"name":sharedUser.name,"password":sharedUser.password}
      this.make_login_request(user)
      
    }
    else{
      console.log("Need to display connection form")
    }
  }
  

  addExtra(extraInfo:String,extra:Product){
    let all_items  = ["pizza","drink","chicken","sauce"];
    let EmptyExtra : Product = {"id":null,"name":"/","price":0,"desc":""};
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
    this.restauService.cartExtra.push(extra_item);
    alert('menu added to cart');
    
  }
}

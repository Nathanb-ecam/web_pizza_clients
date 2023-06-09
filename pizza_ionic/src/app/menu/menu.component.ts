import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';
import { SigninCardComponent } from '../signin-card/signin-card.component';
import { AdminService, Token, User } from '../admin.service';
import { Product,RestaurantService } from '../restaurant.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
 //define array to save product of DB
  pizzas:Product[]= [];
  drinks:Product[]= [];
  chickens:Product[]= [];
  sauces:Product[]= [];

  isAdmin:boolean=false;
  signedIn:boolean=false;
  token:Token=new Token()

  // retreive child component properties
  @ViewChild(SigninCardComponent) signinCard: any;

  menuPizza:Product=new Product;
  menuChicken:Product=new Product;
  menuSauce:Product=new Product;
  menuDrink:Product=new Product;
  
  extraDrink:Product=new Product;
  extraChicken:Product=new Product;
  extraSauce:Product=new Product;
  extraPizza:Product=new Product;

  constructor( 
    private sharedData : DataSharingService,
    private adminService : AdminService,
    private restauService : RestaurantService
    ) { }

  ngOnInit() {
    this.checkSignedIn()
  }

  fetchAll(){
    //load all pizzas/chicken/drink/sauce from the DB
    this.getPizzas()
    this.getChickens()
    this.getDrinks()
    this.getSauces()
  }

  getPizzas(){
    //load all pizza from DB and save to array "pizzas"
    this.restauService.getPizzas().subscribe(
      data => {
        this.pizzas = data;
      }
    )
  }

  getChickens(){
    //load all chicken from DB and save to array "chikens"
    this.restauService.getChickens().subscribe(
      data => {
        this.chickens = data;
      }
    )
  }

  getSauces(){
    //load all sauce from DB and save to array "sauces"
    this.restauService.getSauces().subscribe(
      data => {
        this.sauces = data;
      }
    )
  }

  getDrinks(){
    //load all drink from DB and save to array "drinks"
    this.restauService.getDrinks().subscribe(
      data => {
        this.drinks = data;
      }
    )
  }

  addMenu(pizza:Product, drink:Product, chicken:Product, sauce:Product){
    //function for user to compose a new menu
    let menu_items:any = {pizza:pizza,drink:drink,chicken:chicken,sauce:sauce};
    
    for (var item in menu_items){
      if (menu_items[item].id == undefined) {
        alert('please fill all field !');
        return;
      }
    }
    //push the menu to CartMenu
    this.restauService.cartMenu.push(menu_items);
    alert('menu added to cart');
  }

  addExtra(extraInfo:String,extra:Product){
    // if we select an extra, this extra will be strore to cartExtra
    // and all another extra will be replace to EmptyExtra
    let all_items  = ["pizza","drink","chicken","sauce"];
    let EmptyExtra : Product = {"id":null,"name":"/","price":0,"desc":""};
    let extra_item:any = {};

    if (extra.id == undefined) {
      //check if no extra is selected
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

  login(){
    //make sure username and password are not empty field
    if (this.signinCard.username != '' && this.signinCard.password != ''){
      let user :User = {"name":this.signinCard.username,"password":this.signinCard.password}
      console.log(user)
      this.make_login_request(user)
    }
    else{
      console.log("Veuillez remplir tous les champs du formulaire")
    }

  }

  make_login_request(user:User){
    //change signeIn state and store user information to share data
    this.adminService.login(user).subscribe(  
      data => {
        this.token = data;
        console.log(this.token);
        this.signedIn=true;
        this.fetchAll()
        this.isAdmin= data.isAdmin;
        console.log("isAdmin"+ this.isAdmin)
        this.sharedData.setUser(user);
        this.sharedData.setToken(data);

      }
    )
  }

  checkSignedIn(){
    //check if this user have always the token
    let sharedUser  = this.sharedData.getUser();
    console.log("sharedUser",sharedUser)
    if(sharedUser != null){
      this.signedIn= true
      let user:User = {"name":sharedUser.name,"password":sharedUser.password}
      this.make_login_request(user)
    }
  }

}

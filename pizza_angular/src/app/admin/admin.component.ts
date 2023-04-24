import { Component } from '@angular/core';
import { AdminService, MenuExplicit } from '../admin.service';
import { Menu,OrderExtra,Client,User,Token } from '../admin.service';
import { Product,ProductType} from '../restaurant.service';
import { RestaurantService } from '../restaurant.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  name:string="";
  password:string="";


  pizzas:Product[]=[]
  chickens:Product[]=[]
  sauces:Product[]=[]
  drinks:Product[]=[]
  menus:MenuExplicit[]=[]
  orderextras:OrderExtra[]=[]
  clients:Client[]=[]


  pizzaName:string="";

  token:Token=new Token()
  isAdmin:boolean=false;
  signedIn:Boolean=false

  constructor(private adminService : AdminService,private restauService : RestaurantService){

  }
  
  ngOnInit(){
    
    
  }

  login(){
    let user:User = {"name":this.name,"password":this.password}
    this.adminService.login(user).subscribe(
      data => {
        this.token = data;
        console.log(this.token);
        this.signedIn=true;
        this.isAdmin= data.isAdmin;
        console.log("isAdmin"+ this.isAdmin)
        this.showAllTables()
      }
    )
  }

  showAllTables(){
    this.showOrderExtrasTable()
    this.showClientsTable()
    this.showPizzaTable()
    this.showMenusExplicitTable()
    this.showSauceTable()
    this.showDrinkTable()
    this.showChickenTable()

  }


  showMenusExplicitTable(){
    console.log("Explicit menus");
    this.adminService.getMenusExplicit(this.token.token).subscribe(
      data => {
        this.menus = data;
        console.log("this.menus");
        console.log(this.menus);
      }
    )
  }

  updateMenuRow(){
    console.log()
  }

  showClientsTable(){
    this.adminService.getClients(this.token.token).subscribe(
      data => {
        this.clients = data;
        // console.log(this.clients);
      }
    )
  }

  showOrderExtrasTable(){
    this.adminService.getOrderExtras(this.token.token).subscribe(
      data => {
        this.orderextras= data;
        // console.log(this.orderextras);
      }
    )
  }


  showPizzaTable(){
    this.restauService.getPizzas().subscribe(
      data => {
        this.pizzas= data;
        // console.log("Pizza");
        // console.log(this.pizzas);
      }
    )
  }



  showDrinkTable(){
    this.restauService.getDrinks().subscribe(
      data => {
        this.drinks= data;
        console.log("Drink");
        console.log(this.drinks);
      }
    )
  }
  showChickenTable(){
    this.restauService.getChickens().subscribe(
      data => {
        this.chickens= data;
        console.log("Chicken");
        console.log(this.chickens);
      }
    )
  }
  showSauceTable(){
    this.restauService.getSauces().subscribe(
      data => {
        this.sauces= data;
        console.log("Sauce");
        console.log(this.sauces);
      }
    )
  }



}

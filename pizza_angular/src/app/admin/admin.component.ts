import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
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
  menus:Menu[]=[]
  orderextras:OrderExtra[]=[]
  clients:Client[]=[]


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
    this.showMenusTable()
    this.showOrderExtrasTable()
    this.showClientsTable()
    this.showPizzaTable()
    // this.showSauceTable()
    // this.showDrinkTable()
    // this.showChickenTable()

  }


  showMenusTable(){
    this.adminService.getMenus().subscribe(
      data => {
        this.menus = data;
        // console.log(this.menus);
      }
    )
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
        console.log("Pizza");
        console.log(this.pizzas);
      }
    )
  }

  corresponding_item(id:number,type:string){
    console.log("corrsponding ...");
    console.log(id,type)
    // let item:Product;
    switch(type){
      case "pizza":
        return this.pizzas.find(pizza=>pizza.id===id);
        break;
      case "chicken":
        return this.chickens.find(chicken=>chicken.id===id);
        break;
      case "drink":
        return this.drinks.find(drink=>drink.id===id);
        break;
      case "sauce":
        return this.sauces.find(sauce=>sauce.id===id);
        break;
      default:
        console.log("Not found");
        return
        break;
    }
  }

  // showDrinkTable(){
  //   this.restauService.getDrinks().subscribe(
  //     data => {
  //       this.drinks= data;
  //       console.log("Drink");
  //       console.log(this.drinks);
  //     }
  //   )
  // }
  // showChickenTable(){
  //   this.restauService.getChickens().subscribe(
  //     data => {
  //       this.chickens= data;
  //       console.log("Chicken");
  //       console.log(this.chickens);
  //     }
  //   )
  // }
  // showSauceTable(){
  //   this.restauService.getSauces().subscribe(
  //     data => {
  //       this.sauces= data;
  //       console.log("Sauce");
  //       console.log(this.sauces);
  //     }
  //   )
  // }



}

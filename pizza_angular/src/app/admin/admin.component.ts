import { Component,Inject } from '@angular/core';
import { AdminService, MenuExplicit } from '../admin.service';
import { Menu,OrderExtra,Client,User,Token } from '../admin.service';
import { Product,ProductType} from '../restaurant.service';
import { RestaurantService } from '../restaurant.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormAdminComponent } from '../form-admin/form-admin.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  columnsToDisplay:string[] = ['menu_id', 'Pizza','Drink','Sauce','Chicken','action'];
  menuDataSource:any;

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

  constructor(
    private adminService : AdminService,
    private restauService : RestaurantService,
    public dialog: MatDialog
    ){}
  



  ngOnInit(){

    
  }


  openDialog() {
    this.dialog.open(FormAdminComponent, {
      data: {
        animal: 'panda',
      },
    });
  }

  login(){
    // let user:User = {"name":this.name,"password":this.password}
    let user:User = {"name":"Nath","password":"1234"}
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
    // this.showOrderExtrasTable()
    // this.showClientsTable()
    // this.showPizzaTable()
    this.showMenusExplicitTable()
    // this.showSauceTable()
    // this.showDrinkTable()
    // this.showChickenTable()

  }


  showMenusExplicitTable(){
    console.log("Explicit menus");
    this.adminService.getMenusExplicit(this.token.token).subscribe(
      data => {
        // this.menus = data;
        this.menuDataSource = new MatTableDataSource(data)
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

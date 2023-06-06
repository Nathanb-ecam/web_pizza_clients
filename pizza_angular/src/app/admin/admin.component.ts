import { Component,Inject, ViewChild } from '@angular/core';
import { AdminService, MenuExplicit } from '../admin.service';
import { MenuEntity,OrderExtra,Client,User,Token } from '../admin.service';
import { Product,ProductDto,ProductType} from '../restaurant.service';
import { RestaurantService } from '../restaurant.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuEditComponent } from '../menu-edit/menu-edit.component';
import { DataSharingServiceService } from '../data-sharing-service.service';
import { SigninCardComponent } from '../signin-card/signin-card.component';
import { PizzaEditComponent } from '../pizza-edit/pizza-edit.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  menuColumnsToDisplay:string[] = ['menu_id', 'Pizza','Drink','Sauce','Chicken','action'];
  clientColumnsToDisplay:string[] = ['Client_id', 'Name','Password','isAdmin','Points'];
  pizzaColumnsToDisplay:string[] = ['Id', 'Name','Price','Desc','Action'];
  menuDataSource:any;
  clientDataSource:any;
  pizzaDataSource:any;


  // retreive child component properties : username and password
  @ViewChild(SigninCardComponent) signinCard: any;


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
    private sharedData : DataSharingServiceService,
    public dialog: MatDialog
    ){}
  



  ngOnInit(){
    this.automatic_login()

  }




  automatic_login(){
    let sharedUser  = this.sharedData.getUser();
    // console.log("sharedUser",sharedUser)
    if (sharedUser != undefined){
      let user:User = {"name":sharedUser.name,"password":sharedUser.password}
      this.make_login_request(user)
    }
    else{
      console.log("Need to display connection form")
    }
  }

  login(){
    if (this.signinCard.username != '' && this.signinCard.password != ''){
      let user :User = {"name":this.signinCard.username,"password":this.signinCard.password}
      // console.log(user)
      this.make_login_request(user)
    }
    else{
      console.log("Veuillez remplir tous les champs du formulaire")
    }

  }

  make_login_request(user:User){
    this.adminService.login(user).subscribe(
      data => {
        this.token = data;
        // console.log(this.token);
        this.signedIn=true;
        this.isAdmin= data.isAdmin;
        // console.log("isAdmin"+ this.isAdmin)
        this.showAllTables()
      }
    )
  }

  addMenu(){
    const dialogRef = this.dialog.open(MenuEditComponent, {
      data: {
        menu:null,
        token:this.token,

      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.handle_dialog_cases(result);
    });
  }

  updateMenu(menu:MenuExplicit) {
    const dialogRef = this.dialog.open(MenuEditComponent, {
      data: {
        menu: menu,
        token:this.token,

      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.handle_dialog_cases(result);
    });
  }
  
  addPizza(){
    const dialogRef = this.dialog.open(PizzaEditComponent, {
      data: {
        menu:null,
        token:this.token,

      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.handle_dialog_cases(result);
    });
  }

  updatePizza(pizza:ProductDto) {
    const dialogRef = this.dialog.open(PizzaEditComponent, {
      data: {
        pizza: pizza,
        token:this.token,

      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.handle_dialog_cases(result);
    });
  }

  deletePizza(id:number) {
    console.log("pizza id to remove",id)
    this.adminService.deletePizza(id,this.token.token).subscribe(
      data => {
        // console.log(data);
        this.showPizzaTable()
      },error=>{
        if(error.status ==500){
          // dans ce cas il faut d'abord vider les rangées qui dépendent de la pizza a supprimer
          console.log("damn la petite 500")
        }
        console.log("ERROR IN DELETE PIZZA")
      }
    )
  }

  handle_dialog_cases(result:String){
    if(result){
      if(result=="refresh-token"){
        this.signedIn=false;
        this.isAdmin=false;
      }else{
        console.log("user canceled modifications")
      }
    }
    else{
      this.showMenusExplicitTable()
      this.showPizzaTable()
    }
  }


  showAllTables(){
    // this.showOrderExtrasTable()
    this.showClientsTable()
    // this.showPizzaTable()
    this.showMenusExplicitTable()
    this.showPizzaTable()
    // this.showSauceTable()
    // this.showDrinkTable()
    // this.showChickenTable()

  }


  showMenusExplicitTable(){
    // console.log("Explicit menus");
    this.adminService.getMenusExplicit(this.token.token).subscribe(
      data => {
        // this.menus = data;
        this.menuDataSource = new MatTableDataSource(data);
        // console.log("this.menus DataSource");
        // console.log(data);
      }
    )
  }

  showPizzaTable(){
    // console.log("Explicit menus");
    this.adminService.getPizzas(this.token.token).subscribe(
      data => {
        // this.menus = data;
        this.pizzaDataSource = new MatTableDataSource(data);
        // console.log("this.menus DataSource");
        // console.log(data);
      }
    )
  }

  updateMenuRow(){
    console.log()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clientDataSource.filter = filterValue.trim().toLowerCase();
  }

  
  showClientsTable(){
    this.adminService.getClients(this.token.token).subscribe(
      data => {
        this.clients = data;
        this.clientDataSource = new MatTableDataSource(data);
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
}

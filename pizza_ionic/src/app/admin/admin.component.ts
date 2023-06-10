import { Component,Inject, ViewChild } from '@angular/core';
import { AdminService, MenuExplicit } from '../admin.service';
import { MenuEntity,OrderExtra,Client,User,Token } from '../admin.service';
import { Product,ProductType} from '../restaurant.service';
import { RestaurantService } from '../restaurant.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuEditComponent } from '../menu-edit/menu-edit.component';
import { DataSharingService } from '../data-sharing.service';
import { SigninCardComponent } from '../signin-card/signin-card.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  menuColumnsToDisplay:string[] = ['menu_id', 'Pizza','Drink','Sauce','Chicken','action'];
  clientColumnsToDisplay:string[] = ['Client_id', 'Name','isAdmin','Points'];
  menuDataSource:any;
  clientDataSource:any;


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
    private sharedData : DataSharingService,
    public dialog: MatDialog
    ){}
  



  ngOnInit(){
    this.automatic_login()

  }


  openDialog(menu:MenuExplicit) {
    const dialogRef = this.dialog.open(MenuEditComponent, {
      data: {
        menu: menu,
        token:this.token,

      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showMenusExplicitTable()
    });

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

  login(){
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

  addMenu(){
    const dialogRef = this.dialog.open(MenuEditComponent, {
      data: {
        menu:null,
        token:this.token,

      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showMenusExplicitTable()
    });
  }

  deleteMenu(id:number){
    console.log('need to delete menu n°',id);
    this.adminService.deleteMenu(id,this.token.token).subscribe(
      data=>{
        console.log(`Deleted menu with id ${id}`);
        console.log("Request result",data);
        this.showMenusExplicitTable()
      }
    )
    
  }
  showAllTables(){
    // this.showOrderExtrasTable()
    this.showClientsTable()
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
        this.menuDataSource = new MatTableDataSource(data);
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
        console.log(this.clients);
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

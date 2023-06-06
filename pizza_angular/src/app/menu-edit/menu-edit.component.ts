import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu, Product, RestaurantService } from '../restaurant.service';
import { AdminService, Token } from '../admin.service';
import { DataSharingServiceService } from '../data-sharing-service.service';


@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent {
  token:Token=new Token;


  // selectedChicken:string=''
  chickens:Product[]=[];
  pizzas:Product[]=[];
  drinks:Product[]=[];
  sauces:Product[]=[];

  currentselection:any;
  selectedPizza: Product = new Product;
  selectedChicken:Product = new Product;
  selectedSauce:Product = new Product;
  selectedDrink:Product = new Product;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private restauService:RestaurantService,
      private adminService:AdminService,
      private sharedData:DataSharingServiceService,
      private _dialogRef:MatDialogRef<MenuEditComponent>
    ){
    console.log('child received data',data);
    this.currentselection = data.menu;
    if (data.token != null){
      this.token = data.token;
    }
    if (this.currentselection!= null){
      this.selectedChicken = data.menu.chicken;
      this.selectedPizza = data.menu.pizza;
      this.selectedDrink = data.menu.drink;
      this.selectedSauce = data.menu.sauce;
      // console.log("current menu",this.currentselection);
    }


  }

  ngOnInit(){
    this.fetchAll()
  }

  addMenu(){
    if(this.selectedChicken.name!=null && this.selectedDrink.name != null && this.selectedPizza.name != null && this.selectedSauce.name != null){
      // console.log(menu)
      let menu = {"idPizza":this.selectedPizza.id,"idChicken":this.selectedChicken.id,"idDrink":this.selectedDrink.id,"idSauce":this.selectedSauce.id}
      this.adminService.addMenu(menu,this.token.token).subscribe(
        data=>{
          // console.log(data);
          this._dialogRef.close()
        },
        error=>{
          if(error.statusText =="Unauthorized"){
            console.log("Unauthorized, need to refresh token")
            this._dialogRef.close("refresh-token");
          }
        }
      )
    }
    else{
      console.log("All fields need to be filled to add a menu")
    }
  }

  updateMenu(){
    const menu:Menu = {"idPizza":this.selectedPizza.id,"idChicken":this.selectedChicken.id,"idDrink":this.selectedDrink.id,"idSauce":this.selectedSauce.id}
    this.adminService.modifyMenu(menu,this.currentselection.menu_id,this.token.token).subscribe(
      data=>{
        // console.log("DAAAATAAAAAA")
        // console.log(data);
        this._dialogRef.close();
      },
      error=>{
        if(error.statusText =="Unauthorized"){
          console.log("Unauthorized, need to refresh token")
          this._dialogRef.close("refresh-token");
        }
      }
    )
  }

  // refresh_token(){
  //   console.log("Need to refresh token")
  //   let u = this.sharedData.getUser()
  //   let user = {"name":u.name,"password":u.password}
  //   console.log("RENEW USER TOKEN")
  //   console.log(user)
  //   this.adminService.login(user).subscribe(
  //     data => {
  //       this.sharedData.setToken(data);
  //       this.token = data;
  //       return data
  //     }
  //   )
    
  // }


  cancel(){
    console.log("canceled")
    this._dialogRef.close("cancel")
  }
  fetchAll(){
    this.getChickens()
    this.getPizzas()
    this.getDrinks()
    this.getSauces()
  }

  getDrinks(){
    this.restauService.getDrinks().subscribe(
      data=>{
        this.drinks = data;
      }
    );
  }
  getPizzas(){
    this.restauService.getPizzas().subscribe(
      data=>{
        this.pizzas = data;
      }
    );
  }
  getChickens(){
    this.restauService.getChickens().subscribe(
      data=>{
        this.chickens = data;
      }
    );
  }
  getSauces(){
    this.restauService.getSauces().subscribe(
      data=>{
        this.sauces = data;
      }
    );
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu, Product, RestaurantService } from '../restaurant.service';
import { AdminService, MenuExplicit, Token } from '../admin.service';
import { NgForm } from '@angular/forms';

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
      console.log("current menu",this.currentselection);
    }


  }

  ngOnInit(){
    this.fetchAll()
  }

  addMenu(){
    console.log("Menu n°",this.selectedChicken)
    console.log("Menu n°",this.selectedPizza)
    console.log("Menu n°",this.selectedDrink)
    console.log("Menu n°",this.selectedSauce)

    if(this.selectedChicken!=null && this.selectedDrink != null && this.selectedPizza != null && this.selectedSauce != null){
      // console.log(menu)
      let menu = {"idPizza":this.selectedPizza.id,"idChicken":this.selectedChicken.id,"idDrink":this.selectedDrink.id,"idSauce":this.selectedSauce.id}
      console.log("Trying to add a menu")
      console.log("with token : ",this.token)
      console.log("Menu to add :",menu)
      this.adminService.addMenu(menu,this.token.token).subscribe(
        data=>{
          console.log(data);
        }
      )
      this._dialogRef.close()
    }
    else{
      console.log("All fields need to be filled to add a menu")
    }

  }
  updateMenu(){
    // need to make a put request once api routes will be modified
    console.log("Menu n°",this.currentselection.menu_id)
    console.log(this.selectedChicken)
    console.log(this.selectedDrink)
    console.log(this.selectedPizza)
    console.log(this.selectedSauce)

    const menu:Menu = {"idPizza":this.selectedPizza.id,"idChicken":this.selectedChicken.id,"idDrink":this.selectedDrink.id,"idSauce":this.selectedSauce.id}
    this.adminService.modifyMenu(menu,this.currentselection.menu_id,this.token.token).subscribe(
      data=>{
        console.log(data);
      }
    )
    this._dialogRef.close()
  }


  cancel(){
    this._dialogRef.close()
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

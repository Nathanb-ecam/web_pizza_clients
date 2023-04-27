import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu, Product, RestaurantService } from '../restaurant.service';
import { AdminService, MenuExplicit } from '../admin.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent {
  token:string='';


  // selectedChicken:string=''
  chickens:Product[]=[];
  pizzas:Product[]=[];
  drinks:Product[]=[];
  sauces:Product[]=[];

  currentselection:any;
  selectedPizza:any;
  selectedChicken:any;
  selectedSauce:any;
  selectedDrink:any;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private restauService:RestaurantService,
      private adminService:AdminService,
      private _dialogRef:MatDialogRef<MenuEditComponent>
    ){
    this.currentselection = data.menu;
    if (data.token != null){
      this.token = data.token;
    }
    if (this.currentselection!= null){
      this.selectedChicken = data.menu.Chicken.name;
      this.selectedPizza = data.menu.Pizza.name;
      this.selectedDrink = data.menu.Drink.name;
      this.selectedSauce = data.menu.Sauce.name;
      console.log("current menu",this.currentselection);
    }


  }

  ngOnInit(){
    this.fetchAll()
  }

  addMenu(){
    // console.log("Menu n°",this.currentselection.menu_id)

    if(this.selectedChicken!=null && this.selectedDrink != null && this.selectedPizza != null && this.selectedSauce != null){
      // need to get the corresponding ids of that selection 
      // const selection = this.correspondingElements().map((obj)=>{

      // SELECTION DOESNt CONTaiN THE W_RIGHT ELEMENTS 
      // console.log(menu)
      let menu = {"idPizza":1,"idChicken":1,"idDrink":1,"idSauce":1}
      console.log("Trying to add a menu")
      console.log("with token : ",this.token)
      
      this.adminService.addMenu(menu,this.token).subscribe(
        data=>{
          console.log(data);
        }
      )
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
    // const menu:Menu = {"idPizza":0,"idChicken":0,"idDrink":0,"idSauce":0}
    // this.restauService.addMenu(menu).subscribe({
      
    // })

  }

    correspondingElements(){
      const pizza = this.pizzas.find((obj)=>obj.name===this.selectedPizza);
      const drink = this.drinks.find((obj)=>obj.name===this.selectedDrink);
      const chicken = this.chickens.find((obj)=>obj.name===this.selectedChicken);
      const sauce = this.sauces.find((obj)=>obj.name===this.selectedSauce);
      return [pizza,chicken,drink,sauce]
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

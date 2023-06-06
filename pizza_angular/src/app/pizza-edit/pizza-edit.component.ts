import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu, Product, ProductDto, RestaurantService } from '../restaurant.service';
import { AdminService, Token } from '../admin.service';
import { DataSharingServiceService } from '../data-sharing-service.service';


@Component({
  selector: 'app-pizza-edit',
  templateUrl: './pizza-edit.component.html',
  styleUrls: ['./pizza-edit.component.css']
})
export class PizzaEditComponent {
  token:Token=new Token;


  pizzas:Product[]=[];


  currentselection:any;
  selectedId: number = 0;
  selectedName:string = '';
  selectedPrice:number = 0;
  selectedDesc:string = '';

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private restauService:RestaurantService,
      private adminService:AdminService,
      private sharedData:DataSharingServiceService,
      private _dialogRef:MatDialogRef<PizzaEditComponent>
    ){
    console.log('child received data',data);
    this.currentselection = data.pizza;
    if (data.token != null){
      this.token = data.token;
    }
    if (this.currentselection!= null){
      this.selectedId = data.pizza.id;
      this.selectedName = data.pizza.name;
      this.selectedPrice = data.pizza.price;
      this.selectedDesc = data.pizza.desc;
      // console.log("current menu",this.currentselection);
    }


  }

  ngOnInit(){
    this.fetchAll()
  }

  addPizza(){
    if(this.selectedId!=null && this.selectedName != null && this.selectedPrice != null && this.selectedDesc != null){
      let pizza:ProductDto = {"name":this.selectedName,"price":this.selectedPrice,"desc":this.selectedDesc}
      console.log("PIZZA A AJOUTER",pizza)
      this.adminService.addPizza(pizza,this.token.token).subscribe(
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

  updatePizza(){
    const pizza:ProductDto = {"name":this.selectedName,"price":this.selectedPrice,"desc":this.selectedDesc}
    this.adminService.modifyPizza(pizza,this.currentselection.id,this.token.token).subscribe(
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




  cancel(){
    console.log("canceled")
    this._dialogRef.close("cancel")
  }

  fetchAll(){
    this.getPizzas()
  }


  getPizzas(){
    this.restauService.getPizzas().subscribe(
      data=>{
        this.pizzas = data;
      }
    );
  }

}

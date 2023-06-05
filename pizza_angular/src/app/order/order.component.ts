import { Component } from '@angular/core';
import { ElementOrder, Menu,OrderExtra,RestaurantService } from '../restaurant.service';
import { AdminService, Token, User } from '../admin.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  all_cart:any = this.restauService.cartMenu.concat(this.restauService.cartExtra);
  orderDataSource:any;
  columnsToDisplay:string[] = [ 'Pizza','Drink','Sauce','Chicken','Price','action'];
  token:Token= new Token();

  constructor(private adminService : AdminService,
    private restauService : RestaurantService){

  }
  validate(){
    if (this.all_cart == 0){
        alert('please add something to cart!');
        return;
    }
    else{
      this.restauService.addOrder(this.token.user_id,this.token.token).subscribe(
        orderID => {
          for (var menu of this.restauService.cartMenu) {
            let newMenu :Menu = { "idSauce":menu.sauce.id,"idChicken":menu.chicken.id,"idPizza":menu.pizza.id,"idDrink":menu.drink.id};
            this.restauService.addMenu(newMenu,this.token.token).subscribe(
              menuID => {
                let ElementOrder: ElementOrder = {"idOrder":Number(orderID),"idMenu":menuID}
                this.restauService.addElementOrder(ElementOrder,this.token.token).subscribe()
              }
            );
          }

          for (var extra of this.restauService.cartExtra) {
            let newExtra :OrderExtra={ "idOrder":Number(orderID),"idExtraDrink":extra.drink.id,"idExtraPizza":extra.pizza.id,"idExtraChicken":extra.chicken.id,"idExtraSauce":extra.sauce.id};
            this.restauService.addOrderExtra(newExtra,this.token.token).subscribe()
          }
        }
      )
      alert('thank you for your order');
    }
  } 

  ngOnInit(){
    this.loadCart();
    this.login()
  }

  loadCart(){
    this.orderDataSource = new MatTableDataSource(this.all_cart)

  }

  login(){
    let user:User = {"name":"Nath","password":"1234"}
    this.adminService.login(user).subscribe(
      data => {
        this.token = data;
      }
    )
  }
  
  
  deleteMenu(order:any){
    const emplacementAllCart = this.all_cart.indexOf(order); 
    this.all_cart.splice(emplacementAllCart,1);  

      const emplacementMenuCart = this.restauService.cartMenu.indexOf(order); 
      if (emplacementMenuCart == -1){
   
        const emplacementExtraCart = this.restauService.cartExtra.indexOf(order); 
        this.restauService.cartExtra.splice(emplacementExtraCart,1);  
      }
      else{
        this.restauService.cartMenu.splice(emplacementMenuCart,1);  
      }
    this.loadCart();
  }
}

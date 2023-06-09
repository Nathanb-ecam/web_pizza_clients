import { Component } from '@angular/core';
import { ElementOrder, Menu,OrderExtra,RestaurantService } from '../restaurant.service';
import { AdminService, Token, User } from '../admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataSharingService } from '../data-sharing.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  //combine cartMenu and cartExtra to a single array
  all_cart:any = this.restauService.cartMenu.concat(this.restauService.cartExtra);
  orderDataSource:any;
  columnsToDisplay:string[] = [ 'Pizza','Drink','Sauce','Chicken','Price','action'];
  token:Token= new Token();

  constructor(
    private adminService : AdminService,
    private restauService : RestaurantService,
    private sharedData : DataSharingService){
     
  }
  validate(){
    if (this.all_cart == 0){
      //if the user confirm his order but nothing is in his order
        alert('please add something to cart!');
        return;
    }
    else{
      this.restauService.addOrder(this.token.user_id,this.token.token).subscribe(
        orderID => {
          alert('thank you for your order');
          for (var menu of this.restauService.cartMenu) {
            //add each ordered menu to our DB
            let newMenu :Menu = { "idSauce":menu.sauce.id,"idChicken":menu.chicken.id,"idPizza":menu.pizza.id,"idDrink":menu.drink.id};
            this.restauService.addMenu(newMenu,this.token.token).subscribe(
              menuID => {
                //create element order based on the id of menu
                let ElementOrder: ElementOrder = {"idOrder":Number(orderID),"idMenu":menuID}
                this.restauService.addElementOrder(ElementOrder,this.token.token).subscribe()
              }
            );
          }

          for (var extra of this.restauService.cartExtra) {
            //add each ordered extra to our DB
            let newExtra :OrderExtra={ "idOrder":Number(orderID),"idExtraDrink":extra.drink.id,"idExtraPizza":extra.pizza.id,"idExtraChicken":extra.chicken.id,"idExtraSauce":extra.sauce.id};
            this.restauService.addOrderExtra(newExtra,this.token.token).subscribe()
          }

        },
        error=>{
          if(error.statusText =="Unauthorized"){
            this.refreshToken()

          }
        }
      )
      
    }
  } 
   refreshToken(){
      //if the token is expired, we ask the user to refresh his token
      alert('please reconnect');
      let u = this.sharedData.getUser()
      let user:User = {"name":u.name,"password":u.password}
      console.log("Unauthorized, need to refresh token")
      this.adminService.login(user).subscribe(

        data => {
  
          console.log("Login status");
  
          console.log(data);
  
          if(data){
            //update user and token of sharedDate
            this.sharedData.setUser(user);
            this.token = data
            this.sharedData.setToken(data);
  
          }
        }
  
      )

    
   }
  ngOnInit(){
    this.loadCart();
    this.login()
  }

  loadCart(){
    //refresh order table 
    this.orderDataSource = new MatTableDataSource(this.all_cart)

  }

  login(){
    let sharedUser  = this.sharedData.getUser();
    let user:User = {"name":sharedUser.name,"password":sharedUser.password}
    this.adminService.login(user).subscribe(
      data => {
        this.token = data;
      }
    )
  }
  
  
  deleteMenu(order:any){
    //delete a menu of user order array
    const emplacementAllCart = this.all_cart.indexOf(order); 
    this.all_cart.splice(emplacementAllCart,1);  

      const emplacementMenuCart = this.restauService.cartMenu.indexOf(order); 
      if (emplacementMenuCart == -1){
        //if delete element is not a menu, the selected element is an extra
        const emplacementExtraCart = this.restauService.cartExtra.indexOf(order); 
        this.restauService.cartExtra.splice(emplacementExtraCart,1);  
      }
      else{
        this.restauService.cartMenu.splice(emplacementMenuCart,1);  
      }
    this.loadCart();
  }
}

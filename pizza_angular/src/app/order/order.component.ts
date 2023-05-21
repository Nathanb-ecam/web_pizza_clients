import { Component } from '@angular/core';
import { Menu,RestaurantService } from '../restaurant.service';
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
        data => {
          console.log(data);
        }
      )
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

import { Component } from '@angular/core';
import { Menu,RestaurantService } from '../restaurant.service';
import { AdminService } from '../admin.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  all_cart:any =this.restauService.cartMenu.concat(this.restauService.cartExtra);
  orderDataSource:any;
  columnsToDisplay:string[] = [ 'Pizza','Drink','Sauce','Chicken','Price','action'];

  constructor(private adminService : AdminService,
    private restauService : RestaurantService){

  }
  validate(){
    if (this.all_cart == 0){
        alert('please add something to cart!');
        return;
    }
    else{
      console.log('this.restauService.cartExtra ',this.restauService.cartExtra);
      console.log('this.restauService.cartMenu ',this.restauService.cartMenu);
    }
  } 

  ngOnInit(){
    this.loadCart();
  }

  loadCart(){
    this.orderDataSource = new MatTableDataSource(this.all_cart)

  }
  
  deleteMenu(order:any){
    const emplacementAllCart = this.all_cart.indexOf(order); 
    this.all_cart.splice(emplacementAllCart,1);  
    this.loadCart();

    try{
      const emplacementMenuCart = this.restauService.cartMenu.indexOf(order); 
      this.all_cart.splice(emplacementMenuCart,1);  
    }catch{
      const emplacementExtraCart = this.restauService.cartExtra.indexOf(order); 
      this.all_cart.splice(emplacementExtraCart,1);  
    }
  }
}

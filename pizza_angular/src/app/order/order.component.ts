import { Component } from '@angular/core';
import { Menu,RestaurantService } from '../restaurant.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  
  orderDataSource:any='';
  columnsToDisplay:string[] = [ 'Pizza','Drink','Sauce','Chicken','Price','action'];

  constructor(private adminService : AdminService,
    private restauService : RestaurantService){

  }
  validate(){
    if (this.restauService.cart.length == 0){
        alert('please add something to cart!');
        return;
    }
    else{
      for (var item of this.restauService.cart){
        let selectedMenu: Menu={"idSauce":item[3].id,"idChicken":item[2].id,"idPizza":item[0].id,"idDrink":item[1].id}
        this.restauService.addMenu(selectedMenu)
      }
    }
  } 

  ngOnInit(){
    this.loadCart();
  }

  loadCart(){
    this.orderDataSource=this.restauService.cart;
  }
  
  deleteMenu(order:any){
    const emplacement = this.restauService.cart.indexOf(order); 
    this.restauService.cart.splice(emplacement,1);  
    this.loadCart();
  }
}

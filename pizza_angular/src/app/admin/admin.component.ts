import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { Menu,OrderExtra,Client,User,Token } from '../admin.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  menus:Menu[]=[]
  orderextras:OrderExtra[]=[]
  clients:Client[]=[]
  user:User ={"name":"Nath","password":"1234"};


  token:Token=new Token()
  isAdmin:boolean=false;
  signedIn:Boolean=false

  constructor(private adminService : AdminService){

  }
  
  ngOnInit(){
    
    
  }

  login(){
    this.adminService.login(this.user).subscribe(
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

  showAllTables(){
    this.showMenusTable()
    this.showOrderExtrasTable()
    this.showClientsTable()

  }


  showMenusTable(){
    this.adminService.getMenus().subscribe(
      data => {
        this.menus = data;
        console.log(this.menus);
      }
    )
  }
  showClientsTable(){
    this.adminService.getClients(this.token.token).subscribe(
      data => {
        this.clients = data;
        console.log(this.clients);
      }
    )
  }

  showOrderExtrasTable(){
    this.adminService.getOrderExtras(this.token.token).subscribe(
      data => {
        this.orderextras= data;
        console.log(this.orderextras);
      }
    )
  }



}

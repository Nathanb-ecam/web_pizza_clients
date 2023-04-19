import { Component } from '@angular/core';
import { Pizza, UserService } from '../user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  pizzas:Pizza[]= [];
  constructor(private userService : UserService){

  }
  ngOnInit(){
    this.userService.getPizzas().subscribe(
      data => {
        this.pizzas = data;
        console.log(this.pizzas);
      }
    )
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { IPagination } from './shared/models/pagination';
import { IProduct } from './shared/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'Skinet';
  constructor(private basketService:BasketService,private accountService:AccountService) {}

  ngOnInit(): void {
   this.loadBasket();
   this.loadCurrrentUser();
  }

  loadCurrrentUser(){
    const token = localStorage.getItem('token');
      this.accountService.loadCurrentUser(token).subscribe(
        ()=>{
          console.log("user loaded");
        },error => {
          console.log(error);
        }
      )
    
  }

  loadBasket(){
    const basketId = localStorage.getItem('basket_id');
    console.log(basketId);
    if(basketId){
      this.basketService.getBasket(basketId).subscribe(
        basket => {
          console.log(basket);

        },error => {
          console.log(error);
        }
      )
    }
  }
}

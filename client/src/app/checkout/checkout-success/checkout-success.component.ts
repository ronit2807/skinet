import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styles: [
  ]
})
export class CheckoutSuccessComponent implements OnInit {

  Order: IOrder;
  constructor(private router:Router) {
    const navigation = router.getCurrentNavigation();
    const state = navigation && navigation.extras && navigation.extras.state;
    if(state){
      this.Order = state as IOrder;
    }
   }

  ngOnInit(): void {
  }

}

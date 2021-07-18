import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { IDeliverMethod } from 'src/app/shared/models/deliverMethod';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styles: [
  ]
})
export class CheckoutDeliveryComponent implements OnInit {

  @Input() checkoutForm: FormGroup;
  deliveryMethods: IDeliverMethod[];
  constructor(private checkoutService: CheckoutService,private basketService: BasketService) { }

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe(
      (dms: IDeliverMethod[]) =>{
        this.deliveryMethods = dms;
      },error => {
        console.log(error);
      }
    )
  }

  setShippingPrice(deliveryMethod: IDeliverMethod){
    this.basketService.setShippingPrice(deliveryMethod);
  }
}

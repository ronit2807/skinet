import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDeliverMethod } from '../shared/models/deliverMethod';
import { IOrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl=environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getDeliveryMethods(){
    return this.httpClient.get(this.baseUrl+'orders/deliveryMethods').pipe(
      map((dm: IDeliverMethod[]) => {
        return dm.sort((a,b) => b.price - a.price);
      })
    )
  }

  createOrder(order: IOrderToCreate){
    return this.httpClient.post(this.baseUrl+'orders',order);
  }
}

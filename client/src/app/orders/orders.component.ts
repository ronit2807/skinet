import { Component, OnInit } from '@angular/core';
import { IOrder } from '../shared/models/order';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: IOrder[];
  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    console.log(1);
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrdersForUser().subscribe(
      (orders: IOrder[]) => {
        this.orders = orders;
      }
    )
  }

}

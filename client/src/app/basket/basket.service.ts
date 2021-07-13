import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();
  constructor(private httpClient:HttpClient) { }

  getBasket(id: string){
    console.log(this.baseUrl+'basket?basketId='+id);
    return this.httpClient.get(this.baseUrl+'basket?basketId='+id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        console.log(basket);
        this.calculateTotals();
        
      })
    );
  }

  setBasket(basket: IBasket){
    console.log("111");
    console.log(basket)
    return this.httpClient.post(this.baseUrl+'basket',basket).subscribe(
      (basket: IBasket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      },
      error => {
        console.log(error);
      }
    )
  }

   incrementQuantity(item: IBasketItem)
  {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x=>x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

   decrementQuantity(item: IBasketItem)
  {
    const basket = this.getCurrentBasketValue();
    
    const foundItemIndex = basket.items.findIndex(x=>x.id === item.id);
    
    if(basket.items[foundItemIndex].quantity > 1){
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    }
    else {
      this.removeItemFromBasket(item);
    }
    
  }
  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if(basket.items.some(x=>x.id === item.id)){
      basket.items = basket.items.filter(i=>i.id !== item.id)
    }
    if(basket.items.length > 0){
      this.setBasket(basket);
    }
    else {
      this.deleteBasket(basket);
    }
  }
  deleteBasket(basket: IBasket) {
    return this.httpClient.delete(this.baseUrl+'basket?basketId='+basket.id).subscribe(
      ()=>{
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      },error =>{
        console.log(error);
      }
    )
  }

  private calculateTotals(){
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subtotals = basket.items.reduce((a,b)=>(b.quantity*b.price)+ a,0);
    const total = subtotals+shipping;
    this.basketTotalSource.next({shipping: shipping,subtotals: subtotals,total: total});
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct,quantity: number){
    const itemToAdd: IBasketItem = this.mapProductToItem(item,quantity);

    const basket = this.getCurrentBasketValue() ?? this.createBasket();

    basket.items = addOrUpdateItems(basket.items,itemToAdd,quantity);
    console.log(basket.items);
    this.setBasket(basket);
  }
  private createBasket(): IBasket {
    
    const basket = new Basket();
    localStorage.setItem('basket_id',basket.id);
    return basket;
  }
  private mapProductToItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity: quantity,
      pictureUrl:  item.pictureUrl,
      brand: item.productBrand,
      type: item.productType
    }
  }
}
function addOrUpdateItems(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {

  const index = items.findIndex(i=>i.id === itemToAdd.id);
  if(index === -1){
    itemToAdd.quantity = quantity;
    items.push(itemToAdd);
  }
  else {
    items[index].quantity+=quantity;
  }
  return items;
}


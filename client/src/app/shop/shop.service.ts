import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IType } from '../shared/models/type';
import {map} from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl='https://localhost:5001/api/';
  constructor(private httpClient: HttpClient) { }

  getProducts(shopParams: ShopParams)
  {
    let params = new HttpParams();
    if(shopParams.brandId !== 0){
      params = params.append("brandId",shopParams.brandId.toString());
    }
    if(shopParams.typeId !== 0){
      params = params.append("typeId",shopParams.typeId.toString());
    }
    if(shopParams.sortSelected){
      params = params.append("sort",shopParams.sortSelected);
    }

    params = params.append("pageNumber",shopParams.pageNumber.toString());
    params = params.append("pageSize",shopParams.pageSize.toString());
    if(shopParams.search){
      params = params.append("search",shopParams.search);
    }
    //console.log(params);
    return this.httpClient.get<IPagination>(this.baseUrl+'products',{observe: 'response',params: params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getBrands()
  {
    return this.httpClient.get<IBrand[]>(this.baseUrl+'products/brands');
  }

  getTypes()
  {
    return this.httpClient.get<IType[]>(this.baseUrl+'products/types');
  }

  getProduct(id: number)
  {
    return this.httpClient.get<IProduct>(this.baseUrl+'products/'+id);
  }
}

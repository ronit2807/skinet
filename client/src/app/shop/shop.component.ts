import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/type';
import { ShopService } from './shop.service';
import {ShopParams} from '../shared/models/shopParams'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('search',{static: false}) searchInput: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];
  shopParams = new ShopParams();
  totalCount: number;
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(
      response => {
        console.log(response)
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },error => {
        console.log(error);
      }
    );
  }

  getBrands() {
    this.shopService.getBrands().subscribe(
      response => {
        this.brands = [{id: 0,name: "All"},...response];
      },error => {
        console.log(error);
      }
    );
  }

  getTypes() {
    this.shopService.getTypes().subscribe(
      response => {
        this.types = [{id: 0,name: "All"},...response];
      },error => {
        console.log(error);
      }
    );
  }

  onBrandSelected(id: number)
  {
    
    this.shopParams.brandId = id;
    this.shopParams.pageNumber =1;
    this.getProducts();
  }

  onTypeSelected(id: number)
  {
    this.shopParams.typeId= id;
    this.shopParams.pageNumber =1;
    this.getProducts();
  }

  onSortSelected(sort: string){
    this.shopParams.sortSelected = sort;
    this.getProducts();
  }

  onPageChanged(event: any)
  {
    if(this.shopParams.pageNumber != event.page){
      this.shopParams.pageNumber = event.page;
      this.getProducts();
    }
    
  }

  onSearch(){
    this.shopParams.search = this.searchInput.nativeElement.value;
    this.shopParams.pageNumber =1;
    this.getProducts();
  }

  onReset(){
    
    this.searchInput.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}

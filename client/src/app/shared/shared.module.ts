import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { CarouselModule} from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';

@NgModule({
  declarations: [
    PageHeaderComponent,
    PagerComponent,
    OrderTotalsComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot()
  ],
  exports: [
    PaginationModule,
    PageHeaderComponent,
    PagerComponent,
    CarouselModule,
    OrderTotalsComponent
  ]
})
export class SharedModule { }

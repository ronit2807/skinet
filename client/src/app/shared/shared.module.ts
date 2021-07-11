import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { CarouselModule} from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    PageHeaderComponent,
    PagerComponent
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
    CarouselModule
  ]
})
export class SharedModule { }

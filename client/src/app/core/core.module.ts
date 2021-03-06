import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';
import { SectionHeadersComponent } from './section-headers/section-headers.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [NavBarComponent, NotFoundComponent, ServerErrorComponent, SectionHeadersComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot({
      //positionClass:'toastr-right-bottom',
      preventDuplicates:true
    }),
    BreadcrumbModule,
    SharedModule
  ],
  exports: [
    NavBarComponent,
    SectionHeadersComponent,
    BreadcrumbModule
  ]
})
export class CoreModule { }

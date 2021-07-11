import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-headers',
  templateUrl: './section-headers.component.html',
  styleUrls: ['./section-headers.component.scss']
})
export class SectionHeadersComponent implements OnInit {

  breadcrumb$:Observable<any[]>;
  constructor(private bsService: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumb$ = this.bsService.breadcrumbs$;
  }

}

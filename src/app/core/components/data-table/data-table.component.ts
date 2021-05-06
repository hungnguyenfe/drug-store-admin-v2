import { Component, Input, OnInit } from '@angular/core'
import { Observable, of } from 'rxjs'

@Component({
  selector: 'shop-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.less'],
})
export class DataTableComponent<T> implements OnInit {
  @Input('data') data: Observable<T[]> = of([])

  constructor() {
  }

  ngOnInit(): void {
  }

}

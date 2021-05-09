import { Component, OnInit } from '@angular/core'
import { CategoryEffect } from '@app-store/core/category/category.effect'
import { Observable } from 'rxjs'
import { Category } from '@app-types/category.types'
import { NzTableQueryParams } from 'ng-zorro-antd/table'
import { transformNzParamsToTableParams } from '@app-shared/utils/common.util'

@Component({
  selector: 'shop-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less'],
})
export class CategoryComponent implements OnInit {
  public categories$: Observable<Category[]>
  public count$: Observable<number>
  public loading$: Observable<boolean>

  public pageSize: number
  public pageSizeOptions: Array<number>
  public pageIndex: number


  constructor(private readonly categoryEffect: CategoryEffect) {
    this.categories$ = categoryEffect.data
    this.count$ = categoryEffect.count
    this.loading$ = categoryEffect.loading

    this.pageSizeOptions = [10, 20, 30]
    this.pageIndex = 1
    this.pageSize = this.pageSizeOptions[0]
  }

  ngOnInit(): void {
  }

  public paramsChange(params: NzTableQueryParams): void {
    const tableParams = transformNzParamsToTableParams(params)
    this.categoryEffect.getData(tableParams)
  }
}

import { Component, OnInit, ViewChild } from '@angular/core'
import { CategoryEffect } from '@app-store/core/category/category.effect'
import { Observable } from 'rxjs'
import { Category, CreateCategoryPayload } from '@app-types/category.types'
import { NzTableComponent, NzTableQueryParams } from 'ng-zorro-antd/table'
import { transformNzParamsToTableParams } from '@app-shared/utils/common.util'
import { NzModalService } from 'ng-zorro-antd/modal'
import { CreateCategoryComponent } from '@app-core/components/create-category/create-category.component'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { UpdateCategoryComponent } from '@app-core/components/update-category/update-category.component'

@UntilDestroy()
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
  public cachedParams: NzTableQueryParams

  @ViewChild('tableData') tableData: NzTableComponent


  constructor(
    private readonly categoryEffect: CategoryEffect,
    private readonly nzModalService: NzModalService,
  ) {
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
    this.cachedParams = params
    const tableParams = transformNzParamsToTableParams(params)
    this.categoryEffect.getData(tableParams)
  }

  public openCreateCategoryModal(): void {
    const createModalRef = this.nzModalService.create({
      nzContent: CreateCategoryComponent,
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false,
    })

    createModalRef.afterClose
      .pipe(
        untilDestroyed(this),
      )
      .subscribe((data: CreateCategoryPayload | null) => {
        if (data) {
          // this will trigger auto reload table via params change emit event
          this.pageIndex = 1
        }
      })
  }

  public openUpdateCategoryModal(id: string): void {
    const updateModalRef = this.nzModalService.create({
      nzContent: UpdateCategoryComponent,
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false,
      nzComponentParams: {id},
    })

    updateModalRef.afterClose
      .pipe(
        untilDestroyed(this),
      )
      .subscribe((data: CreateCategoryPayload | null) => {
        if (data) {
          this.paramsChange(this.cachedParams)
        }
      })
  }
}

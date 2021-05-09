import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { CategoryActions, CategoryActionTypes } from '@app-store/core/category/category.action'
import { catchError, switchMap, finalize, map, tap } from 'rxjs/operators'
import { CategoryService } from '@app-core/services/category.service'
import { Observable, of } from 'rxjs'
import { MessageActions } from '@app-store/message/message.action'
import { MessageVariant, TableParams } from '@app-types/common.types'
import { CoreState } from '@app-store/core/core.state'
import { Injectable } from '@angular/core'
import { CategorySelectors } from '@app-store/core/category/category.selector'
import { Category } from '@app-types/category.types'

@Injectable()
export class CategoryEffect {
  private readonly data$ = this.store.select(CategorySelectors.GetData)
  private readonly count$ = this.store.select(CategorySelectors.GetCount)
  private readonly loading$ = this.store.select(CategorySelectors.GetLoading)

  private readonly effectGetData$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActionTypes.EffectGetData),
    tap(() => this.store.dispatch(CategoryActions.SetLoading({loading: true}))),
    switchMap(({params}) => this.categoryService.getCategories(params).pipe(
      map(({data, count}) => CategoryActions.SetDataResponse({data, count})),
      catchError(() => {
        const variant: MessageVariant = {
          type: 'error',
          message: 'Không thể lấy danh sách loại sản phẩm.',
        }
        return of(
          MessageActions.SetMessageVariant({variant}),
          CategoryActions.SetDataResponse({data: [], count: 0}),
        )
      }),
      finalize(() => this.store.dispatch(CategoryActions.SetLoading({loading: false}))),
    )),
  ))

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<CoreState>,
    private readonly categoryService: CategoryService,
  ) {
  }

  public get data(): Observable<Category[]> {
    return this.data$
  }

  public get count(): Observable<number> {
    return this.count$
  }

  public get loading(): Observable<boolean> {
    return this.loading$
  }

  public getData(params: Partial<TableParams>): void {
    this.store.dispatch(CategoryActions.EffectGetData({params}))
  }
}

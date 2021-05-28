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
import { Category, CreateCategoryPayload, UpdateCategoryPayload } from '@app-types/category.types'

@Injectable()
export class CategoryEffect {
  private readonly data$ = this.store.select(CategorySelectors.GetData)
  private readonly count$ = this.store.select(CategorySelectors.GetCount)
  private readonly loading$ = this.store.select(CategorySelectors.GetLoading)
  private readonly createLoading$ = this.store.select(CategorySelectors.GetLoadingCreate)
  private readonly updateLoading$ = this.store.select(CategorySelectors.GetLoadingUpdate)
  private readonly currentData$ = this.store.select(CategorySelectors.GetCurrentData)

  private readonly effectGetData$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActionTypes.EffectGetData),
    tap(() => this.store.dispatch(CategoryActions.SetLoading({loading: true}))),
    switchMap(({params}) => this.categoryService.getCategories(params).pipe(
      map(({results: data, count}) => CategoryActions.SetDataResponse({data, count})),
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

  private readonly effectGetDataById$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActionTypes.EffectGetDataById),
    tap(() => this.store.dispatch(CategoryActions.SetUpdateLoading({updateLoading: true}))),
    switchMap(({id}) => this.categoryService.getCategoryById(id).pipe(
      map((data) => CategoryActions.SetCurrentDataResponse({data})),
      catchError(() => {
        const variant: MessageVariant = {
          type: 'error',
          message: 'Không thể lấy loại sản phẩm.',
        }
        return of(MessageActions.SetMessageVariant({variant}))
      }),
      finalize(() => this.store.dispatch(CategoryActions.SetUpdateLoading({updateLoading: false}))),
    )),
  ))

  private readonly effectCreateData$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActionTypes.EffectCreateData),
    tap(() => this.store.dispatch(CategoryActions.SetCreateLoading({createLoading: true}))),
    switchMap(({data}) => this.categoryService.createCategory(data).pipe(
      switchMap(() => {
        const variant: MessageVariant = {
          type: 'success',
          message: 'Tạo mới loại sản phẩm thành công.',
        }
        return [
          MessageActions.SetMessageVariant({variant}),
          CategoryActions.EffectCreateSuccess(),
        ]
      }),
      // show message error
      catchError(() => {
        const variant: MessageVariant = {
          type: 'error',
          message: 'Không thể tạo mới sản phẩm.',
        }
        return of(MessageActions.SetMessageVariant({variant}))
      }),
      finalize(() => this.store.dispatch(CategoryActions.SetCreateLoading({createLoading: false}))),
    )),
  ))

  private readonly effectUpdateData$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActionTypes.EffectUpdateData),
    tap(() => this.store.dispatch(CategoryActions.SetUpdateLoading({updateLoading: true}))),
    switchMap(({id, data}) => this.categoryService.updateCategory(id, data).pipe(
      switchMap(() => {
        const variant: MessageVariant = {
          type: 'success',
          message: 'Cập nhật loại sản phẩm thành công.',
        }
        return [
          // show message success
          MessageActions.SetMessageVariant({variant}),
          // trigger success actions
          CategoryActions.EffectUpdateSuccess(),
        ]
      }),
      // show message error if error
      catchError(() => {
        const variant: MessageVariant = {
          type: 'error',
          message: 'Không thể cập nhật loại sản phẩm.',
        }
        return of(MessageActions.SetMessageVariant({variant}))
      }),
      finalize(() => this.store.dispatch(CategoryActions.SetUpdateLoading({updateLoading: false}))),
    )),
  ))

  private readonly effectCreateSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActionTypes.EffectCreateSuccess),
  ), {dispatch: false})

  private readonly effectUpdateSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActionTypes.EffectUpdateSuccess),
  ), {dispatch: false})

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

  public get currentData(): Observable<Category | null> {
    return this.currentData$
  }

  public get createLoading(): Observable<boolean> {
    return this.createLoading$
  }

  public get updateLoading(): Observable<boolean> {
    return this.updateLoading$
  }

  public get effectCreateSuccess(): Observable<never> {
    return this.effectCreateSuccess$
  }

  public get effectUpdateSuccess(): Observable<never> {
    return this.effectUpdateSuccess$
  }

  public getData(params: Partial<TableParams>): void {
    this.store.dispatch(CategoryActions.EffectGetData({params}))
  }

  public getDataById(id: string): void {
    this.store.dispatch(CategoryActions.EffectGetDataById({id}))
  }

  public createData(data: CreateCategoryPayload): void {
    this.store.dispatch(CategoryActions.EffectCreateData({data}))
  }

  public updateData(id: string, data: UpdateCategoryPayload): void {
    this.store.dispatch(CategoryActions.EffectUpdateData({id, data}))
  }
}

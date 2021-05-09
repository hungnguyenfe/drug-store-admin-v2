import { createAction, props } from '@ngrx/store'
import { Category } from '@app-types/category.types'
import { TableParams } from '@app-types/common.types'

export enum CategoryActionTypes {
  EffectGetData = '[Category] Get data category',
  SetDataResponse = '[Category] Set data category from response',
  SetLoading = '[Category] Set loading status',
}

export const CategoryActions = {
  EffectGetData: createAction(CategoryActionTypes.EffectGetData, props<{ params: Partial<TableParams>}>()),
  SetDataResponse: createAction(CategoryActionTypes.SetDataResponse, props<{ data: Category[], count: number }>()),
  SetLoading: createAction(CategoryActionTypes.SetLoading, props<{ loading: boolean }>()),
}

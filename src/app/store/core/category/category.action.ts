import { createAction, props } from '@ngrx/store'
import { Category, CreateCategoryPayload, UpdateCategoryPayload } from '@app-types/category.types'
import { TableParams } from '@app-types/common.types'

export enum CategoryActionTypes {
  EffectGetData = '[Category] Get data category',
  EffectGetDataById = '[Category] Get data category by id',
  EffectCreateData = '[Category] Create category',
  EffectCreateSuccess = '[Category] Create category has been succeed',
  EffectUpdateData = '[Category] Update category',
  EffectUpdateSuccess = '[Category] Update category has been succeed',
  SetDataResponse = '[Category] Set data category from response',
  SetCurrentDataResponse = '[Category] Set data category by id from response',
  SetLoading = '[Category] Set loading status',
  SetCreateLoading = '[Category] Set loading for create category',
  SetUpdateLoading = '[Category] Set loading for update category',
}

export const CategoryActions = {
  EffectGetData: createAction(CategoryActionTypes.EffectGetData, props<{ params: Partial<TableParams> }>()),
  EffectGetDataById: createAction(CategoryActionTypes.EffectGetDataById, props<{ id: string }>()),
  EffectCreateData: createAction(CategoryActionTypes.EffectCreateData, props<{ data: CreateCategoryPayload }>()),
  EffectCreateSuccess: createAction(CategoryActionTypes.EffectCreateSuccess),
  EffectUpdateData: createAction(CategoryActionTypes.EffectUpdateData, props<{ id: string, data: UpdateCategoryPayload }>()),
  EffectUpdateSuccess: createAction(CategoryActionTypes.EffectUpdateSuccess),
  SetDataResponse: createAction(CategoryActionTypes.SetDataResponse, props<{ data: Category[], count: number }>()),
  SetCurrentDataResponse: createAction(CategoryActionTypes.SetCurrentDataResponse, props<{ data: Category | null }>()),
  SetLoading: createAction(CategoryActionTypes.SetLoading, props<{ loading: boolean }>()),
  SetCreateLoading: createAction(CategoryActionTypes.SetCreateLoading, props<{ createLoading: boolean }>()),
  SetUpdateLoading: createAction(CategoryActionTypes.SetUpdateLoading, props<{ updateLoading: boolean }>()),
}

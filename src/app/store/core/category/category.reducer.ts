import { on } from '@ngrx/store'
import { CategoryActions } from '@app-store/core/category/category.action'
import { CoreState } from '@app-store/core/core.state'

export const CategoryReducer = [
  on(CategoryActions.SetLoading, (state: CoreState, {loading}) => {
    return {...state, ...{category: {...state.category, loading}}}
  }),
  on(CategoryActions.SetCurrentDataResponse, (state: CoreState, {data}) => {
    return {...state, ...{category: {...state.category, currentData: data}}}
  }),
  on(CategoryActions.SetDataResponse, (state: CoreState, {data, count}) => {
    return {...state, ...{category: {...state.category, data, count}}}
  }),
  on(CategoryActions.SetCreateLoading, (state: CoreState, {createLoading}) => {
    return {...state, ...{category: {...state.category, createLoading}}}
  }),
  on(CategoryActions.SetUpdateLoading, (state: CoreState, {updateLoading}) => {
    console.log(state)
    return {...state, ...{category: {...state.category, updateLoading}}}
  }),
]

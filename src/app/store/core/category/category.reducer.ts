import { on } from '@ngrx/store'
import { CategoryActions } from '@app-store/core/category/category.action'
import { CoreState } from '@app-store/core/core.state'
import { cloneDeep } from 'lodash'
import { CategoryState } from '@app-store/core/category/category.state'

export const CategoryReducer = [
  on(CategoryActions.SetLoading, (state: CoreState, {loading}) => {
    const cloneState = cloneDeep(state.category) as CategoryState
    cloneState.loading = loading
    return {...state, ...{ category: cloneState }}
  }),
  on(CategoryActions.SetDataResponse, (state: CoreState, {data, total}) => {
    const cloneState = cloneDeep(state.category) as CategoryState
    cloneState.data = data
    cloneState.total = total
    return {...state, ...{ category: cloneState }}
  }),
]

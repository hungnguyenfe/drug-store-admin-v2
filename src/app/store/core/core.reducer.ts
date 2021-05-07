import { CoreState, initCoreState } from '@app-store/core/core.state'
import { createReducer, Action } from '@ngrx/store'
import { CategoryReducer } from '@app-store/core/category/category.reducer'

export const CORE_KEY = 'Core'

export const CoreReducer = (state: CoreState | undefined, action: Action) => {
  return createReducer(
    initCoreState,
    ...CategoryReducer,
  )(state, action)
}

import { createSelector } from '@ngrx/store'
import { coreStateSelector } from '@app-store/core/core.selector'
import { CoreState } from '@app-store/core/core.state'


export const CategorySelectors = {
  GetData: createSelector(
    coreStateSelector,
    (state: CoreState) => state.category.data,
  ),
  GetLoading: createSelector(
    coreStateSelector,
    (state: CoreState) => state.category.loading,
  ),
  GetTotal: createSelector(
    coreStateSelector,
    (state: CoreState) => state.category.total,
  ),
}

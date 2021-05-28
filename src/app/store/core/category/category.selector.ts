import { createSelector } from '@ngrx/store'
import { coreStateSelector } from '@app-store/core/core.selector'
import { CoreState } from '@app-store/core/core.state'


export const CategorySelectors = {
  GetData: createSelector(
    coreStateSelector,
    (state: CoreState) => state.category.data,
  ),
  GetCurrentData: createSelector(
    coreStateSelector,
    (state: CoreState) => state.category.currentData,
  ),
  GetLoading: createSelector(
    coreStateSelector,
    (state: CoreState) => state.category.loading,
  ),
  GetCount: createSelector(
    coreStateSelector,
    (state: CoreState) => state.category.count,
  ),
  GetLoadingCreate: createSelector(
    coreStateSelector,
    (state: CoreState) => state.category.createLoading,
  ),
  GetLoadingUpdate: createSelector(
    coreStateSelector,
    (state: CoreState) => state.category.updateLoading,
  ),
}

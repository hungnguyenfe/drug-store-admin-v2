import { CategoryState, initCategoryState } from '@app-store/core/category/category.state'

export interface CoreState {
  category: CategoryState
}

export const initCoreState: CoreState = {
  category: initCategoryState,
}

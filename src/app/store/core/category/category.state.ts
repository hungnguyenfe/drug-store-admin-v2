import { Category } from '@app-types/category.types'

export interface CategoryState {
  loading: boolean
  data: Category[]
  count: number
  currentData: Category | null,
  createLoading: boolean
  updateLoading: boolean
}

export const initCategoryState: CategoryState = {
  loading: false,
  data: [],
  count: 0,
  currentData: null,
  createLoading: false,
  updateLoading: false,
}

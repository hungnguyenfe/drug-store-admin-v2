import { Category } from '@app-types/category.types'

export interface CategoryState {
  loading: boolean
  data: Category[]
  count: number
}

export const initCategoryState: CategoryState = {
  loading: false,
  data: [],
  count: 0,
}

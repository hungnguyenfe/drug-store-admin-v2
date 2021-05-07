import { Category } from '@app-types/category.types'

export interface CategoryState {
  loading: boolean
  data: Category[]
  total: number
}

export const initCategoryState: CategoryState = {
  loading: false,
  data: [],
  total: 0,
}

export interface Category {
  id: string | number
  name: string
}

export interface CreateCategoryPayload extends Pick<Category, 'name'> {
}

export interface UpdateCategoryPayload extends Pick<Category, 'name'> {
}

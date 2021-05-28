export interface Category {
  id: string
  ratio: string
  created: string
  modified: string
  name: string
}

export interface CreateCategoryPayload extends Pick<Category, 'name'> {
}

export interface UpdateCategoryPayload extends Pick<Category, 'name'> {
}

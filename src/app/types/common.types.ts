export interface MessageVariant {
  type: 'error' | 'success' | 'info' | 'warn',
  message: string | null
}

export interface TokenDecodedData {
  exp: number
  username: string
  email: string
}

export interface MenuItem {
  icon: string
  path: any[] | string | null | undefined
  label: string
}

export interface TableParams {
  page: number
  limit: number
  keyword: string
  price_from: number | null
  price_to: number | null
}

export interface DataTableResponse<T> {
  data: T[]
  count: number
  page: number
}

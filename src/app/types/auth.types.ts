export interface Account {
  username: string
  email: string
  exp: number
}

export interface LoginPayload {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  work_space_id: string
}

export type LocalStorageData = LoginResponse

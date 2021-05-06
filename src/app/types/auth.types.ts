export interface Account {
  username: string
  email: string
}

export interface LoginPayload {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  workspaceId: string
}

export type LocalStorageData = LoginResponse

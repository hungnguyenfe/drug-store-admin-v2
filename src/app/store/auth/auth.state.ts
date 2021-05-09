import { Account } from '@app-types/auth.types'

export interface AuthState {
  account: Account | null
  loading: boolean
  isLogged: boolean
  workspaceId: string
}

export const initAuthState: AuthState = {
  account: null,
  loading: false,
  isLogged: false,
  workspaceId: null,
}

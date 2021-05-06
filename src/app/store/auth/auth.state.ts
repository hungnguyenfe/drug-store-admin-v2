import { Account } from '@app-types/auth.types'

export interface AuthState {
  account: Account | null
  loading: boolean
  isLogged: boolean
}

export const initAuthState: AuthState = {
  account: null,
  loading: false,
  isLogged: false,
}

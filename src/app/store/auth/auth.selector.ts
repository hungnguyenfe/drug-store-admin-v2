import { createSelector } from '@ngrx/store'
import { AppState } from '@app-store/state'

const getAuthState = (state: AppState) => state.auth

export const AuthSelectors = {
  SelectLoading: createSelector(getAuthState, (state) => state.loading),
  SelectIsLogged: createSelector(getAuthState, (state) => state.isLogged),
  SelectAccount: createSelector(getAuthState, (state) => state.account),
}

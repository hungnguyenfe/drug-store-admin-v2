import { AuthState, initAuthState } from '@app-store/auth/auth.state'
import { Action, createReducer, on } from '@ngrx/store'
import { AuthActions } from '@app-store/auth/auth.actions'

export const AuthReducer = (authState: AuthState | undefined, action: Action) => {
  return createReducer(
    initAuthState,
    on(AuthActions.SetAccount, (state, { account }) => ({ ...state, account })),
    on(AuthActions.SetLoading, (state, { loading }) => ({ ...state, loading })),
    on(AuthActions.SetLoggedStatus, (state, { isLogged }) => ({ ...state, isLogged })),
    on(AuthActions.SetWorkspaceId, (state, { workspaceId }) => ({ ...state, workspaceId })),
  )(authState, action)
}

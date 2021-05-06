import { createAction, props } from '@ngrx/store'
import { Account, LoginPayload } from '@app-types/auth.types'

export enum AuthActionTypes {
  EffectInitState = '[Auth] Trigger effect init state',
  EffectLogin = '[Auth] Trigger effect login',
  EffectLogout = '[Auth] Trigger effect logout',
  SetLoading = '[Auth] Set loading status',
  SetAccount = '[Auth] Set account',
  SetLoggedStatus = '[Auth] Set logged status',
}

export const AuthActions = {
  EffectInitState: createAction(AuthActionTypes.EffectInitState),
  EffectLogout: createAction(AuthActionTypes.EffectLogout),
  EffectLogin: createAction(AuthActionTypes.EffectLogin, props<{ data: LoginPayload }>()),
  SetLoading: createAction(AuthActionTypes.SetLoading, props<{ loading: boolean }>()),
  SetLoggedStatus: createAction(AuthActionTypes.SetLoggedStatus, props<{ isLogged: boolean }>()),
  SetAccount: createAction(AuthActionTypes.SetAccount, props<{ account: Account | null }>()),
}

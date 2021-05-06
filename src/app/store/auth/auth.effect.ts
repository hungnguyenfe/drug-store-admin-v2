import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { AuthSelectors } from '@app-store/auth/auth.selector'
import { AppState } from '@app-store/state'
import { Observable, of } from 'rxjs'
import { Account, LoginPayload, LoginResponse } from '@app-types/auth.types'
import { AuthActions, AuthActionTypes } from '@app-store/auth/auth.actions'
import { catchError, delay, exhaustMap, finalize, map, mergeAll, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { MessageActions } from '@app-store/message/message.action'
import { MessageVariant } from '@app-types/common.types'
import { Router } from '@angular/router'
import { AuthService } from '@app/services/auth.service'

@Injectable()
export class AuthEffect {
  private readonly loading$ = this.store.select(AuthSelectors.SelectLoading)
  private readonly isLogged$ = this.store.select(AuthSelectors.SelectIsLogged)
  private readonly account$ = this.store.select(AuthSelectors.SelectAccount)

  private readonly effectInitState$ = createEffect(() => this.action$.pipe(
    ofType(AuthActionTypes.EffectInitState),
    // get token and validate data before init module
    map(() => {
      const storeData = this.authService.localStoreData
      if (!storeData) {
        return []
      }
      const tokenData = this.authService.decodeToken(storeData.token) || {
        exp: new Date('2029/12/31').getTime() / 1000,
        username: 'admin',
        email: 'hung.nguyen14fe@gmail.com',
      }
      const isValidate = this.authService.isValidData(tokenData)

      if (isValidate) {
        return [
          AuthActions.SetLoggedStatus({
            isLogged: true,
          }),
          AuthActions.SetAccount({
            account: this.authService.buildAccountData(tokenData),
          }),
        ]
      } else {
        return []
      }
    }),
    mergeAll(),
  ))

  private readonly effectLogin$ = createEffect(() => this.action$.pipe(
    ofType(AuthActionTypes.EffectLogin),
    // Enabled loading
    tap(() => this.store.dispatch(AuthActions.SetLoading({loading: true}))),
    delay(3000),
    // Excuse API
    exhaustMap(({data}) => this.authService.login(data).pipe(
      // Set token and Build account data
      map((response: LoginResponse) => {
        // Set token
        this.authService.localStoreData = response

        //  Build account data
        const tokenData = this.authService.decodeToken(response.token)
        return this.authService.buildAccountData(tokenData)
      }),
      // Dispatch actions Set status and Account data into store
      map((account: Account) => [
          AuthActions.SetLoggedStatus({isLogged: true}),
          AuthActions.SetAccount({account}),
        ],
      ),
      mergeAll(),
      // Redirect to Core module
      tap(() => this.navigateToCoreModule()),
      // Catch error
      catchError((error) => {
        const variant: MessageVariant = {
          type: 'error',
          message: error,
        }
        return of(MessageActions.setMessageVariant({variant}))
      }),
      // Turn off loading
      finalize(() => {
        this.store.dispatch(AuthActions.SetLoading({loading: false}))
      }),
    )),
  ))

  private readonly effectLogout$ = createEffect(() => this.action$.pipe(
    ofType(AuthActionTypes.EffectLogout),
    // Dispatch actions remove account and turn off loggedStatus
    map(() => [
      AuthActions.SetAccount({account: null}),
      AuthActions.SetLoggedStatus({isLogged: false}),
    ]),
    mergeAll(),
    // Redirect to auth page
    tap(() => this.navigateToAuthModule()),
  ))

  constructor(
    private readonly action$: Actions,
    private readonly store: Store<AppState>,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
  }

  get loading(): Observable<boolean> {
    return this.loading$
  }

  get isLogged(): Observable<boolean> {
    return this.isLogged$
  }

  get account(): Observable<Account | null> {
    return this.account$
  }

  private navigateToCoreModule(): void {
    this.router.navigate(['core'])
  }

  private navigateToAuthModule(): void {
    this.router.navigate(['auth'])
  }

  public login(data: LoginPayload): void {
    this.store.dispatch(AuthActions.EffectLogin({data}))
  }

}

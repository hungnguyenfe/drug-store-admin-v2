import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthSelectors } from '@app-store/auth/auth.selector'
import { map } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { AppState } from '@app-store/state'

@Injectable({
  providedIn: 'root',
})
export class CoreGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(AuthSelectors.SelectIsLogged).pipe(
      map((isLogged) => {
        if (!isLogged) {
          this.router.navigate(['auth'])
        }
        return isLogged
      }),
    )
  }

}

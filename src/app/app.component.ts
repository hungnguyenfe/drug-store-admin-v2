import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from '@app-store/state'
import { AuthActions } from '@app-store/auth/auth.actions'

@Component({
  selector: 'shop-root',
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.EffectInitState())
  }
}

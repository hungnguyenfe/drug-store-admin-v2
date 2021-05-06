import vi from '@angular/common/locales/vi'

import { NgModule } from '@angular/core'
import { NZ_I18N } from 'ng-zorro-antd/i18n'
import { vi_VN } from 'ng-zorro-antd/i18n'

import { AppComponent } from './app.component'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StoreModule } from '@ngrx/store'
import { AppRoutingModule } from '@app/app-routing.module'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { NzMessageModule } from 'ng-zorro-antd/message'
import { MessageEffect } from '@app-store/message/message.effect'
import { CoreModule } from '@app-core/core.module'

import { registerLocaleData } from '@angular/common'
import { MessageReducer } from '@app-store/message/message.reducer'
import { AuthReducer } from '@app-store/auth/auth.reducer'
import { AuthEffect } from '@app-store/auth/auth.effect'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzInputModule } from 'ng-zorro-antd/input'
import { LoginComponent } from '@app/auth/pages/login/login.component'
import { ReactiveFormsModule } from '@angular/forms'

registerLocaleData(vi)

const antModules = [
  NzMessageModule,
  NzButtonModule,
  NzCardModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot({
      message: MessageReducer,
      auth: AuthReducer,
    }),
    StoreDevtoolsModule.instrument({}),
    EffectsModule.forRoot([
      MessageEffect,
      AuthEffect,
    ]),
    ...antModules,
  ],
  providers: [{provide: NZ_I18N, useValue: vi_VN}],
  bootstrap: [AppComponent],
})
export class AppModule {
}

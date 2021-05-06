import { NgModule } from '@angular/core'
import { RouterModule, Route } from '@angular/router'
import { CoreGuard } from '@app/guards/core.guard'
import { AuthGuard } from '@app/guards/auth.guard'
import { LoginComponent } from '@app/auth/pages/login/login.component'

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'signup',
        pathMatch: 'full',
      },
      {
        path: 'signup',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'core',
    loadChildren: () => import('./core/core.module').then(module => module.CoreModule),
    canActivate: [CoreGuard],
  },
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}

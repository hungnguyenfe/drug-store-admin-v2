import { NgModule } from '@angular/core'
import { Route, RouterModule } from '@angular/router'
import { DashboardComponent } from '@app/core/pages/dashboard/dashboard.component'
import { LayoutComponent } from '@app/core/components/layout/layout.component'
import { CategoryComponent } from './pages/category/category.component'

const routes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
    ],
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class CoreRoutingModule {
}

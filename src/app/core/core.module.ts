import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from '@app/core/pages/dashboard/dashboard.component'
import { CoreRoutingModule } from '@app/core/core-routing.module'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { LayoutComponent } from './components/layout/layout.component'
import { DataTableComponent } from './components/data-table/data-table.component'
import { CategoryComponent } from './pages/category/category.component'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzTableModule } from 'ng-zorro-antd/table'

const antModules = [
  NzLayoutModule,
  NzMenuModule,
  NzIconModule,
  NzCardModule,
  NzTableModule,
]

@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    DataTableComponent,
    CategoryComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    ...antModules,
  ],
})
export class CoreModule {
}

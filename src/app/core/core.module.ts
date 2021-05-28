import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from '@app/core/pages/dashboard/dashboard.component'
import { CoreRoutingModule } from '@app/core/core-routing.module'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { LayoutComponent } from './components/layout/layout.component'
import { CategoryComponent } from './pages/category/category.component'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzTableModule } from 'ng-zorro-antd/table'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { CORE_KEY, CoreReducer } from '@app-store/core/core.reducer'
import { CategoryEffect } from '@app-store/core/category/category.effect'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzBadgeModule } from 'ng-zorro-antd/badge'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { CreateCategoryComponent } from './components/create-category/create-category.component'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzFormModule } from 'ng-zorro-antd/form'
import { ReactiveFormsModule } from '@angular/forms'
import { NzInputModule } from 'ng-zorro-antd/input';
import { UpdateCategoryComponent } from './components/update-category/update-category.component'
import { NzSpinModule } from 'ng-zorro-antd/spin'

const antModules = [
  NzLayoutModule,
  NzMenuModule,
  NzIconModule,
  NzCardModule,
  NzTableModule,
  NzAvatarModule,
  NzDropDownModule,
  NzBadgeModule,
  NzButtonModule,
  NzModalModule,
  NzFormModule,
  NzInputModule,
  NzSpinModule,
]

@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    CategoryComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(CORE_KEY, CoreReducer),
    EffectsModule.forFeature([CategoryEffect]),
    ...antModules,
  ],
})
export class CoreModule {
}

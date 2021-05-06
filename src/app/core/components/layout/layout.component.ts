import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core'
import { MenuItem } from '@app-types/common.types'

@Component({
  selector: 'shop-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  public isCollapsed: boolean
  public menuItems: MenuItem[]

  constructor(private renderer2: Renderer2) {
    this.isCollapsed = false
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'dashboard',
        path: ['dashboard'],
      },
      {
        label: 'Category',
        icon: 'appstore',
        path: ['category'],
      },
    ]
  }

  ngOnInit(): void {
    this.renderer2.addClass(document.body, 'fix-header')
  }

  ngOnDestroy(): void {
    this.renderer2.removeClass(document.body, 'fix-header')
  }
}

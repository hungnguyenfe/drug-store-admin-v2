import { Component, OnInit } from '@angular/core'
import { CategoryEffect } from '@app-store/core/category/category.effect'
import { Observable } from 'rxjs'
import { Category } from '@app-types/category.types'

@Component({
  selector: 'shop-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less'],
})
export class CategoryComponent implements OnInit {
  public data$: Observable<Category[]>
  public total$: Observable<number>
  public loading$: Observable<boolean>

  constructor(private readonly categoryEffect: CategoryEffect) {
    this.data$ = categoryEffect.data
    this.total$ = categoryEffect.total
    this.loading$ = categoryEffect.loading
  }

  ngOnInit(): void {
    this.categoryEffect.getData({})
  }

}

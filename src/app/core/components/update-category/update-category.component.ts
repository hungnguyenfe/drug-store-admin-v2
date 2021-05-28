import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Observable, of } from 'rxjs'
import { NzModalRef } from 'ng-zorro-antd/modal'
import { CategoryEffect } from '@app-store/core/category/category.effect'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { makeAllAsDirty } from '@app-shared/utils/common.util'
import { Category } from '@app-types/category.types'

@UntilDestroy()
@Component({
  selector: 'shop-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.less'],
})
export class UpdateCategoryComponent implements OnInit {
  @Input()
  public id: string
  public categoryForm: FormGroup
  public isLoading: Observable<boolean>

  constructor(
    private formBuilder: FormBuilder,
    private modalRef: NzModalRef,
    private categoryEffect: CategoryEffect,
  ) {
  }

  ngOnInit(): void {
    this.isLoading = this.categoryEffect.updateLoading
    this.categoryEffect.getDataById(this.id)
    // close modal if Update success
    this.categoryEffect.effectUpdateSuccess.pipe(
      untilDestroyed(this),
    ).subscribe(() => {
      this.closeModal(true)
    })
    // create form when data is ready
    this.categoryEffect.currentData.pipe(
      untilDestroyed(this),
    ).subscribe((category) => {
      if (category) {
        this.categoryForm = this.createForm(category)
      }
    })
  }

  createForm(category: Category): FormGroup {
    return this.formBuilder.group({
      name: [category.name, Validators.required],
    })
  }

  submitForm(): void {
    makeAllAsDirty(this.categoryForm)
    console.log(this.categoryForm.invalid)
    if (this.categoryForm.invalid) {
      return
    }

    this.categoryEffect.updateData(this.id, this.categoryForm.getRawValue())
  }

  closeModal(data = null): void {
    this.modalRef.close(data)
  }
}

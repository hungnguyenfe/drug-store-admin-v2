import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NzModalRef } from 'ng-zorro-antd/modal'
import { makeAllAsDirty } from '@app-shared/utils/common.util'
import { CategoryEffect } from '@app-store/core/category/category.effect'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Observable } from 'rxjs'

@UntilDestroy()
@Component({
  selector: 'shop-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.less'],
})
export class CreateCategoryComponent implements OnInit {
  public categoryForm: FormGroup
  public isLoading: Observable<boolean>

  constructor(
    private formBuilder: FormBuilder,
    private modalRef: NzModalRef,
    private categoryEffect: CategoryEffect,
  ) {
  }

  ngOnInit(): void {
    this.categoryForm = this.createForm()
    this.isLoading = this.categoryEffect.createLoading
    this.categoryEffect.effectCreateSuccess.pipe(
      untilDestroyed(this),
    ).subscribe(() => {
      this.closeModal(true)
    })
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
    })
  }

  submitForm(): void {
    makeAllAsDirty(this.categoryForm)
    if (this.categoryForm.invalid) {
      return
    }

    this.categoryEffect.createData(this.categoryForm.getRawValue())
  }

  closeModal(data = null): void {
    this.modalRef.close(data)
  }
}

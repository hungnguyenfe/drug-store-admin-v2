import { FormGroup } from '@angular/forms'
import { NzTableQueryParams } from 'ng-zorro-antd/table'
import { TableParams } from '@app-types/common.types'

export const makeAllAsDirty = (form: FormGroup): void => {
  for (const i in form.controls) {
    if (form.controls[i]) {
      form.controls[i].markAsDirty()
      form.controls[i].updateValueAndValidity()
    }
  }
}

export const transformNzParamsToTableParams = (params: NzTableQueryParams): Partial<TableParams> => {
  const {pageIndex, pageSize, filter} = params
  return {
    page: pageIndex,
    limit: pageSize,
  }
}

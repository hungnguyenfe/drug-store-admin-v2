import { FormGroup } from '@angular/forms'

export const makeAllAsDirty = (form: FormGroup): void => {
  for (const i in form.controls) {
    if (form.controls[i]) {
      form.controls[i].markAsDirty()
      form.controls[i].updateValueAndValidity()
    }
  }
}

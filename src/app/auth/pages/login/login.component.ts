import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { makeAllAsDirty } from '@app-shared/utils/common.util'
import { AuthEffect } from '@app-store/auth/auth.effect'
import { Observable } from 'rxjs'

@Component({
  selector: 'shop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup
  public loading$: Observable<boolean>

  constructor(private formBuilder: FormBuilder, private authEffect: AuthEffect) {
    this.loading$ = authEffect.loading
  }

  ngOnInit(): void {
    this.loginForm = this.createForm()
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      username: ['admin', Validators.required],
      password: ['hungnguyen12345', Validators.required],
    })
  }

  submitForm(): void {
    makeAllAsDirty(this.loginForm)
    if (this.loginForm.invalid) {
      return
    }

    this.authEffect.login(this.loginForm.getRawValue())
  }
}

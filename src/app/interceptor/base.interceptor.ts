import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { AuthService } from '@app/services/auth.service'
import { AuthEffect } from '@app-store/auth/auth.effect'
import { catchError, delay, tap } from 'rxjs/operators'

@Injectable()
export class BaseInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private authEffect: AuthEffect) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newRequest = request
    const storeData = this.authService.localStoreData
    if (storeData) {
      newRequest = request.clone({
        setHeaders: {
          Authorization: `JWT ${storeData.token}`,
        },
      })
    }

    return next.handle(newRequest)
      .pipe(
        tap((response) => {
          // handle before return to service
          return response
        }),
        catchError((errorResponse) => {
          console.log(errorResponse)
          if (errorResponse instanceof HttpErrorResponse) {
            if (errorResponse.status === 401) {
              this.authEffect.logout()
            }
          }
          return throwError(errorResponse.error)
        }),
      )
  }
}

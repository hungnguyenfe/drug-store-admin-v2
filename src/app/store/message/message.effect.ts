import { Injectable } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd/message'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { MessageActions } from '@app-store/message/message.action'
import { tap } from 'rxjs/operators'

@Injectable()
export class MessageEffect {
  private readonly effectSetMessage$ = createEffect(() => this.actions$.pipe(
    ofType(MessageActions.setMessageVariant),
    tap(({variant}) => {
      if (variant) {
        this.messageService.create(variant.type, variant.message)
      }
    }),
  ), {dispatch: false})

  constructor(
    private actions$: Actions,
    private messageService: NzMessageService,
  ) {
  }
}

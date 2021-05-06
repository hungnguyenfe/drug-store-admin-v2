import { createAction, props } from '@ngrx/store'
import { MessageVariant } from '@app-types/common.types'

export enum MessageActionsTypes {
  MessageSetVariant = '[Message] Set message',
}

export const MessageActions = {
  setMessageVariant: createAction(
    MessageActionsTypes.MessageSetVariant,
    props<{ variant: MessageVariant | null }>(),
  ),
}


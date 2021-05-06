import { Action, createReducer, on } from '@ngrx/store'
import { initMessageState, MessageState } from '@app-store/message/message.state'
import { MessageActions } from '@app-store/message/message.action'

export const MessageReducer = (messageState: MessageState | undefined, action: Action) => {
  return createReducer(
    initMessageState,
    on(MessageActions.setMessageVariant, (state, {variant}) => ({...state, variant})),
  )(messageState, action)
}

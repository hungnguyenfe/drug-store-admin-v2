import { createSelector } from '@ngrx/store'
import { AppState } from '@app-store/state'
import { MessageState } from '@app-store/message/message.state'

const getMessageState = (state: AppState) => state.message


export const MessageSelectors = {
  SelectVariant: createSelector(
    getMessageState,
    (state: MessageState) => state.variant,
  ),
}

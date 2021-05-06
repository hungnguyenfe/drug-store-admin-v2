import { MessageVariant } from '@app-types/common.types'

export interface MessageState {
  variant: MessageVariant | null
}

export const initMessageState = {
  variant: null,
}

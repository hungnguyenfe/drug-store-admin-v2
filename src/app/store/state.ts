import { MessageState } from '@app-store/message/message.state'
import { AuthState } from '@app-store/auth/auth.state'

export interface AppState {
  message: MessageState,
  auth: AuthState,
}


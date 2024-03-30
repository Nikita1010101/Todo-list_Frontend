import * as authActions from './auth/auth.actions'
import { authSlice } from './auth/auth.slice'

export const rootAction = {
  ...authActions,
  ...authSlice.actions,
}

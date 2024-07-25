import { reducer as appReducer } from './app'
import { reducer as cartReducer } from './cart'
import { reducer as checkoutReducer } from './checkout'
import { reducer as userReducer } from './user'

export const rootReducer = {
  app: appReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  user: userReducer
}

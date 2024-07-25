import * as checkoutActions from './actions'
import { slice } from './slice'

const { actions, reducer } = slice
const asyncActions: any = { ...checkoutActions }

export { actions, asyncActions, reducer }

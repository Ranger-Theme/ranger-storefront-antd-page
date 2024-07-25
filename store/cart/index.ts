import * as cartActions from './actions'
import { slice } from './slice'

const { actions, reducer } = slice
const asyncActions: any = { ...cartActions }

export { actions, asyncActions, reducer }

// @flow
import types from '../constants/ActionTypes'

type State = string

type Action =
| { +type: string }
| { +type: types.SET_VISIBILITY_FILTER, +filter: string }

export default (state: State = types.SHOW_ALL, action: Action): State => {
  switch (action.type) {
    case types.SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

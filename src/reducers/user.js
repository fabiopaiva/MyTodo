// @flow
import types from '../constants/ActionTypes'
import type { User } from '../types/user'

type State = {
  isSignedIn: boolean,
  profile?: User,
}

type Action =
| { +type: string }
| { +type: types.USER_AUTH_SUCCESS, +profile: User }
| { +type: types.USER_LOGOUT }

const initialState = {
  isSignedIn: false,
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case types.USER_AUTH_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        profile: action.profile,
      }
    case types.USER_LOGOUT:
      return {
        ...state,
        isSignedIn: false,
        profile: undefined,
      }
    default:
      return state
  }
}

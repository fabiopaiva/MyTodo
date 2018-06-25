// @flow
import * as actions from './UserActions'
import types from '../constants/ActionTypes'

describe('Todo Filter actions', () => {
  it('should create an action to authenticate successfully', () => {
    const profile = {
      id: 1,
    }
    const expectedAction = {
      type: types.USER_AUTH_SUCCESS,
      profile,
    }
    expect(actions.authSuccess(profile)).toEqual(expectedAction)
  })

  it('should create an action to logout', () => {
    const expectedAction = {
      type: types.USER_LOGOUT,
    }
    expect(actions.logout()).toEqual(expectedAction)
  })
})

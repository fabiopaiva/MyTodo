// @flow
import reducer from './user'
import types from '../constants/ActionTypes'

describe('user reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      isSignedIn: false,
    }
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('should handle USER_AUTH_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.USER_AUTH_SUCCESS,
        isSignedIn: true,
        profile: {
          id: 1,
        },
      }),
    ).toEqual({
      isSignedIn: true,
      profile: {
        id: 1,
      },
    })
  })

  it('should handle USER_AUTH_LOGOUT', () => {
    expect(
      reducer({
        isSignedIn: true,
        profile: {
          id: 1,
        },
      }, {
        type: types.USER_LOGOUT,
      }),
    ).toEqual({
      isSignedIn: false,
    })
  })
})

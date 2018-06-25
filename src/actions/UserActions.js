// @flow
import type { FirebaseUser } from 'firebase/app'
import types from '../constants/ActionTypes'
import firebase from '../firebase'

export const authSuccess = (profile: FirebaseUser) => ({
  type: types.USER_AUTH_SUCCESS,
  profile,
})

export const logout = () => async (dispatch: Function) => {
  await firebase.auth().signOut()
  dispatch({
    type: types.USER_LOGOUT,
  })
}

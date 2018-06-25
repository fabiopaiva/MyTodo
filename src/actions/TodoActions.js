// @flow
import types from '../constants/ActionTypes'
import firebase from '../firebase'
import type { User } from '../types/user'

const database = firebase.database()

export const addTodo = (text: string) => (dispatch: Function, getState: Function) => {
  const { user }: { user: User } = getState()
  const newItem = database.ref(`/todo/${user.profile.uid}`).push()
  newItem.set({ text, uid: user.profile.uid })
}

export const listenFirebaseDBRef = () => (dispatch: Function, getState: Function) => {
  const { user }: { user: User } = getState()
  const ref = database.ref(`/todo/${user.profile.uid}`)
  ref.on('value', (snapshot) => {
    const val = snapshot.val()
    if (val) {
      dispatch({
        type: types.TODO_SYNC,
        items: snapshot.val(),
      })
    }
  })
  return { remove: () => ref.off('value') }
}

export const removeTodo = (id: number) => ({
  type: types.TODO_REMOVE,
  id,
})

export const updateTodo = (id: number, text: string) => ({
  type: types.TODO_UPDATE,
  id,
  text,
})

export const toggleTodo = (id: number) => ({
  type: types.TODO_TOGGLE,
  id,
})

export const setAllTodosStatus = (isCompleted: boolean) => ({
  type: types.TODO_SET_ALL_STATUS,
  isCompleted,
})

export const clearCompleted = () => ({
  type: types.TODO_CLEAR_COMPLETED,
})

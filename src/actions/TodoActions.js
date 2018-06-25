// @flow
import types from '../constants/ActionTypes'
import firebase from '../firebase'
import type { User } from '../types/user'
import type { Todo } from '../types/todo'

export const listenFirebaseDBRef = () => (dispatch: Function, getState: Function) => {
  const { user }: { user: User } = getState()
  const ref = firebase.database().ref(`/todo/${user.profile.uid}`).orderByChild('priority')
  ref.on('value', (snapshot) => {
    const items = []
    snapshot.forEach((item) => {
      items.unshift({ ...item.val(), id: item.key })
    })
    dispatch({
      type: types.TODO_SYNC,
      items,
    })
  })
  return { remove: () => ref.off('value') }
}

export const saveTodo = (todo: Todo) => (dispatch: Function, getState: Function) => {
  const { user }: { user: User } = getState()
  if (todo.id) {
    dispatch({
      type: types.TODO_UPDATE,
      todo,
    })
    const clone = { ...todo }
    delete clone.id
    firebase.database().ref(`/todo/${user.profile.uid}/${todo.id}`).set(clone)
  } else {
    dispatch({
      type: types.TODO_ADD,
      todo,
    })
    firebase.database().ref(`/todo/${user.profile.uid}`).push().set(todo)
  }
}

export const removeTodo = (id: string) => (dispatch: Function, getState: Function) => {
  const { user }: { user: User } = getState()
  dispatch({
    type: types.TODO_REMOVE,
    id,
  })
  firebase.database().ref(`/todo/${user.profile.uid}/${id}`).set(null)
}

export const toggleTodo = (todo: Todo) => (dispatch: Function) => {
  const update = { ...todo, completed: !todo.completed }
  dispatch({
    type: types.TODO_TOGGLE,
    todo,
  })
  dispatch(saveTodo(update))
}

export const setAllTodosStatus = (completed: boolean) => (
  dispatch: Function, getState: Function,
) => {
  const { user, todos: { items } }: { user: User, todos: { items: Array<Todo> } } = getState()
  const updates = items.reduce((acc, item) => {
    acc[`/todo/${user.profile.uid}/${item.id}`] = { ...item, completed }
    return acc
  }, {})
  dispatch({
    type: types.TODO_SET_ALL_STATUS,
    completed,
  })
  firebase.database().ref().update(updates)
}

export const clearCompleted = () => (
  dispatch: Function, getState: Function,
) => {
  const { user, todos: { items } }: { user: User, todos: { items: Array<Todo> } } = getState()
  const updates = items.filter(item => item.completed).reduce((acc, item) => {
    acc[`/todo/${user.profile.uid}/${item.id}`] = null
    return acc
  }, {})
  dispatch({
    type: types.TODO_CLEAR_COMPLETED,
  })
  firebase.database().ref().update(updates)
}

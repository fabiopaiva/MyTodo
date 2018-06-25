// @flow
import types from '../constants/ActionTypes'
import firebase from '../firebase'
import type { User } from '../types/user'
import type { Todo } from '../types/todo'

export const listenFirebaseDBRef = () => async (dispatch: Function, getState: Function) => {
  const { user }: { user: User } = getState()
  const snapshot = await firebase.database().ref(`/todo/${user.profile.uid}`).orderByChild('priority').once('value')
  const items = []
  snapshot.forEach((item) => {
    items.unshift({ ...item.val(), id: item.key })
  })
  dispatch({
    type: types.TODO_SYNC,
    items,
  })

  const ref = firebase.database().ref(`/todo/${user.profile.uid}`)
  ref.on('child_added', (data) => {
    dispatch({
      type: types.TODO_ADD,
      todo: { ...data.val(), id: data.key },
    })
  })

  ref.on('child_changed', (data) => {
    dispatch({
      type: types.TODO_UPDATE,
      todo: { ...data.val(), id: data.key },
    })
  })

  ref.on('child_removed', (data) => {
    dispatch({
      type: types.TODO_REMOVE,
      id: data.key,
    })
  })

  ref.orderByChild('priority').on('child_moved', (data) => {
    dispatch({
      type: types.TODO_ADD,
      todo: { ...data.val(), id: data.key },
    })
  })

  return {
    remove: () => {
      ref.off('child_added')
      ref.off('child_changed')
      ref.off('child_removed')
      ref.off('child_moved')
    },
  }
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
    const newItem = firebase.database().ref(`/todo/${user.profile.uid}`).push()
    newItem.set(todo)
    dispatch({
      type: types.TODO_ADD,
      todo: { ...todo, id: newItem.key },
    })
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

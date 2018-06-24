// @flow
import types from '../constants/ActionTypes'

export const addTodo = (text: string) => ({
  type: types.TODO_ADD,
  text,
})

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

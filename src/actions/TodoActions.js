// @flow
import types from '../constants/ActionTypes'

export const addTodo = (text: string) => ({
  type: types.TODO_ADD,
  text,
})

export const removeTodo = (id: string) => ({
  type: types.TODO_REMOVE,
  id,
})

export const updateTodo = (id: string, text: string) => ({
  type: types.TODO_UPDATE,
  id,
  text,
})

export const setTodoCompleted = (id: string, isCompleted: boolean) => ({
  type: types.TODO_SET_COMPLETED,
  id,
  completed: isCompleted,
})

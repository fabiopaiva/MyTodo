// @flow
import * as actions from './TodoActions'
import types from '../constants/ActionTypes'

describe('actions', () => {
  it('should create an action to remove a todo', () => {
    const id = 1
    const expectedAction = {
      type: types.TODO_REMOVE,
      id,
    }
    expect(actions.removeTodo(id)).toEqual(expectedAction)
  })

  it('should create an action to update a todo', () => {
    const id = 1
    const text = 'Finish my docs'
    const expectedAction = {
      type: types.TODO_UPDATE,
      id,
      text,
    }
    expect(actions.updateTodo(id, text)).toEqual(expectedAction)
  })

  it('should create an action to toggle a todo', () => {
    const id = 1
    const expectedAction = {
      type: types.TODO_TOGGLE,
      id,
    }
    expect(actions.toggleTodo(id)).toEqual(expectedAction)
  })

  it('should create an action to toggle all todos', () => {
    const expectedAction = {
      type: types.TODO_SET_ALL_STATUS,
      isCompleted: true,
    }
    expect(actions.setAllTodosStatus(true)).toEqual(expectedAction)

    const expectedAnotherAction = {
      type: types.TODO_SET_ALL_STATUS,
      isCompleted: false,
    }
    expect(actions.setAllTodosStatus(false)).toEqual(expectedAnotherAction)
  })

  it('should create an action to clean all completeds', () => {
    const expectedAction = {
      type: types.TODO_CLEAR_COMPLETED,
    }
    expect(actions.clearCompleted()).toEqual(expectedAction)
  })
})

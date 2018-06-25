// @flow
import * as actions from './TodoActions'
import types from '../constants/ActionTypes'

describe('actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()
  getState.mockReturnValue({
    user: { profile: {} },
    todos: { items: [] },
  })

  it('should create an action to save a todo', () => {
    const todo = { text: 'Finish my docs' }
    const expectedAction = {
      type: types.TODO_ADD,
      todo,
    }
    actions.saveTodo(todo)(dispatch, getState)
    expect(getState).toBeCalled()
    expect(dispatch).toBeCalledWith(expectedAction)
  })

  it('should create an action to update a todo', () => {
    const todo = { id: 'abc', text: 'Finish my docs' }
    const expectedAction = {
      type: types.TODO_UPDATE,
      todo,
    }
    actions.saveTodo(todo)(dispatch, getState)
    expect(getState).toBeCalled()
    expect(dispatch).toBeCalledWith(expectedAction)
  })

  it('should create an action to remove a todo', () => {
    const id = 'abc'
    const expectedAction = {
      type: types.TODO_REMOVE,
      id,
    }
    actions.removeTodo(id)(dispatch, getState)
    expect(getState).toBeCalled()
    expect(dispatch).toBeCalledWith(expectedAction)
  })

  it('should create an action to toggle a todo', () => {
    const todo = { id: 'abc', text: 'Finish assignment' }
    const expectedAction = {
      type: types.TODO_TOGGLE,
      todo,
    }
    actions.toggleTodo(todo)(dispatch)
    expect(dispatch).toBeCalledWith(expectedAction)
    expect(dispatch).toBeCalledWith(expect.any(Function))
  })

  it('should create an action to toggle all todos', () => {
    const expectedAction = {
      type: types.TODO_SET_ALL_STATUS,
      completed: true,
    }
    actions.setAllTodosStatus(true)(dispatch, getState)
    expect(getState).toBeCalled()
    expect(dispatch).toBeCalledWith(expectedAction)

    const expectedAnotherAction = {
      type: types.TODO_SET_ALL_STATUS,
      completed: false,
    }
    actions.setAllTodosStatus(false)(dispatch, getState)
    expect(getState).toBeCalled()
    expect(dispatch).toBeCalledWith(expectedAnotherAction)
  })

  it('should create an action to clean all completeds', () => {
    const expectedAction = {
      type: types.TODO_CLEAR_COMPLETED,
    }
    actions.clearCompleted()(dispatch, getState)
    expect(getState).toBeCalled()
    expect(dispatch).toBeCalledWith(expectedAction)
  })
})

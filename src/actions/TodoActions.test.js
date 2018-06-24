// @flow
import * as actions from './TodoActions'
import types from '../constants/ActionTypes'

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const text = 'Finish docs'
    const expectedAction = {
      type: types.TODO_ADD,
      text,
    }
    expect(actions.addTodo(text)).toEqual(expectedAction)
  })

  it('should create an action to remove a todo', () => {
    const id = 'abcd-efgh-ijkl-mnop'
    const expectedAction = {
      type: types.TODO_REMOVE,
      id,
    }
    expect(actions.removeTodo(id)).toEqual(expectedAction)
  })

  it('should create an action to update a todo', () => {
    const id = 'abcd-efgh-ijkl-mnop'
    const text = 'Finish my docs'
    const expectedAction = {
      type: types.TODO_UPDATE,
      id,
      text,
    }
    expect(actions.updateTodo(id, text)).toEqual(expectedAction)
  })

  it('should create an action to set completed a todo', () => {
    const id = 'abcd-efgh-ijkl-mnop'
    const completed = true
    const expectedAction = {
      type: types.TODO_SET_COMPLETED,
      id,
      completed,
    }
    expect(actions.setTodoCompleted(id, completed)).toEqual(expectedAction)
  })

  it('should create an action to set not completed a todo', () => {
    const id = 'abcd-efgh-ijkl-mnop'
    const completed = false
    const expectedAction = {
      type: types.TODO_SET_COMPLETED,
      id,
      completed,
    }
    expect(actions.setTodoCompleted(id, completed)).toEqual(expectedAction)
  })
})

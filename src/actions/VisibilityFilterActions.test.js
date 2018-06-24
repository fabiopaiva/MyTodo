// @flow
import * as actions from './VisibilityFilterActions'
import types from '../constants/ActionTypes'

describe('Todo Filter actions', () => {
  it('should create an action to filter all', () => {
    const expectedAction = {
      type: types.SET_VISIBILITY_FILTER,
      filter: types.SHOW_ALL,
    }
    expect(actions.setVisibilityFilter(types.SHOW_ALL)).toEqual(expectedAction)
  })

  it('should create an action to filter active', () => {
    const expectedAction = {
      type: types.SET_VISIBILITY_FILTER,
      filter: types.SHOW_ACTIVE,
    }
    expect(actions.setVisibilityFilter(types.SHOW_ACTIVE)).toEqual(expectedAction)
  })

  it('should create an action to filter completed', () => {
    const expectedAction = {
      type: types.SET_VISIBILITY_FILTER,
      filter: types.SHOW_COMPLETED,
    }
    expect(actions.setVisibilityFilter(types.SHOW_COMPLETED)).toEqual(expectedAction)
  })
})

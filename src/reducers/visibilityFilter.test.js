// @flow
import reducer from './visibilityFilter'
import types from '../constants/ActionTypes'

describe('visibility filter reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(types.SHOW_ALL)
  })

  it('should handle SET_VISIBILITY_FILTER', () => {
    expect(
      reducer(undefined, {
        type: types.SET_VISIBILITY_FILTER,
        filter: types.SHOW_ACTIVE,
      }),
    ).toEqual(types.SHOW_ACTIVE)

    expect(
      reducer(undefined, {
        type: types.SET_VISIBILITY_FILTER,
        filter: types.SHOW_COMPLETED,
      }),
    ).toEqual(types.SHOW_COMPLETED)

    expect(
      reducer(undefined, {
        type: types.SET_VISIBILITY_FILTER,
        filter: types.SHOW_ALL,
      }),
    ).toEqual(types.SHOW_ALL)
  })
})

// @flow
/* eslint-disable import/prefer-default-export */
import types from '../constants/ActionTypes'

type FilterType = 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED'

export const setVisibilityFilter = (filter: FilterType) => ({
  type: types.SET_VISIBILITY_FILTER,
  filter,
})

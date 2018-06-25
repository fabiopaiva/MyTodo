// @flow
import types from '../constants/ActionTypes'
import type { Todo } from '../types/todo'

type State = {
  +items: Array<Todo>,
  +synced: boolean,
}

type Action = { +type: string }
  | { +type: types.TODO_ADD, +todo?: Todo }
  | { +type: types.TODO_REMOVE, +id: number }
  | { +type: types.TODO_UPDATE, +id: number, +todo?: Todo }
  | { +type: types.TODO_TOGGLE, +todo?: Todo }
  | { +type: types.TODO_SET_ALL_STATUS, +completed: boolean }
  | { +type: types.TODO_SYNC, +items: { [key: string]: Todo } }

const initialState = {
  items: [],
  synced: false,
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case types.TODO_ADD:
      return action.todo
        ? {
          ...state,
          items: [action.todo].concat(state.items).sort((a, b) => b.priority - a.priority),
        }
        : state
    case types.TODO_UPDATE:
      return {
        ...state,
        items: state.items.map(todo => ((todo.id === action.id)
          ? { ...todo, text: action.text }
          : todo
        )),
      }
    case types.TODO_REMOVE:
      return {
        ...state,
        items: state.items.filter(todo => (todo.id !== action.id)),
      }
    case types.TODO_TOGGLE:
      return {
        ...state,
        items: state.items.map(todo => ((todo.id === action.id)
          ? { ...todo, completed: !todo.completed }
          : todo
        )),
      }
    case types.TODO_SET_ALL_STATUS:
      return {
        ...state,
        items: state.items.map(todo => ({ ...todo, completed: action.completed })),
      }
    case types.TODO_CLEAR_COMPLETED:
      return {
        ...state,
        items: state.items.filter(todo => !todo.completed),
      }
    case types.TODO_SYNC:
      return {
        ...state,
        items: action.items && typeof action.items === 'object' ? action.items : [],
        synced: true,
      }
    default:
      return state
  }
}

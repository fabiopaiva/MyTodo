// @flow
import types from '../constants/ActionTypes'
import type { Todo } from '../types/todo'

type State = {
  +items: Array<Todo>
}

type Action = { +type: string } 
  | { +type: types.TODO_ADD, id: number, text: string }
  | { +type: types.TODO_REMOVE, id: number }
  | { +type: types.TODO_UPDATE, id: number, text: string }
  | { +type: types.TODO_SET_COMPLETED, id: number, completed: boolean }

const initialState = {
  items: [],
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case types.TODO_ADD:
      return {
        ...state,
        items: [
          {
            id: action.id,
            text: action.text,
            completed: false
          },
          ...state.items
        ]
      }
    case types.TODO_UPDATE:
      return {
        ...state,
        items: state.items.map(todo => (todo.id === action.id) ? 
          { ...todo, text: action.text }
          : todo
        )
      }
    case types.TODO_REMOVE:
      return {
        ...state,
        items: state.items.filter(todo => (todo.id !== action.id))
      }
      case types.TODO_TOGGLE:
      return {
        ...state,
        items: state.items.map(todo => (todo.id === action.id) ? 
          { ...todo, completed: !todo.completed }
          : todo
        )
      }
    default:
      return state
  }
}
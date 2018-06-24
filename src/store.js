/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import todos from './reducers/todos'
import visibilityFilter from './reducers/visibilityFilter'

export default () => createStore(
  combineReducers({
    todos,
    visibilityFilter,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
)

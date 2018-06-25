/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import todos from './reducers/todos'
import visibilityFilter from './reducers/visibilityFilter'
import user from './reducers/user'

export default () => createStore(
  combineReducers({
    todos,
    visibilityFilter,
    user,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
)

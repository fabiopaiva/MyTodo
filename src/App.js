// @flow

import React from 'react'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import cyan from '@material-ui/core/colors/cyan'
import yellow from '@material-ui/core/colors/green'
import CssBaseline from '@material-ui/core/CssBaseline'
import createStore from './store'
import Header from './components/Header'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import firebase from './firebase.js'
import type { User } from './types/user'

const store = createStore()

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: yellow,
  },
})

type Props = {
  user: User,
}
type State = {}

export default class App extends React.Component<Props, State> {
  // componentDidMount() {
  //   this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
  //     this.setState({ isSignedIn: !!user, userProfile: user })
  //   })
  // }

  // componentWillUnmount() {
  //   this.unregisterAuthObserver()
  // }

  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <TodoInput />
          <TodoList />
        </MuiThemeProvider>
      </Provider>
    )
  }
}

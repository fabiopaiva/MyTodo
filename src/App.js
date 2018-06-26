// @flow

import React from 'react'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import cyan from '@material-ui/core/colors/cyan'
import green from '@material-ui/core/colors/green'
import CssBaseline from '@material-ui/core/CssBaseline'
import createStore from './store'
import Header from './components/Header'
import RestrictedArea from './components/RestrictedArea'
import './polyfill/padStart'

const store = createStore()

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: green,
  },
})

export default () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <RestrictedArea />
    </MuiThemeProvider>
  </Provider>
)

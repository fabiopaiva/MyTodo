// @flow

import React from 'react'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import cyan from '@material-ui/core/colors/cyan'
import yellow from '@material-ui/core/colors/green'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import createStore from './store'
import Header from './components/Header'

const store = createStore()

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: yellow,
    type: 'dark',
  },
})

const styles = {
  root: {
    flexGrow: 1,
  },
}

type Props = {
  classes: Object,
}

export default withStyles(styles)(({ classes }: Props) => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Header />
      </div>
    </MuiThemeProvider>
  </Provider>
))

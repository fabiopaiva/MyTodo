// @flow
import React from 'react'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import firebaseApp from '../../firebase'

const styles = {
  root: {
    flex: 1,
    height: 'calc(100% - 64px)', // 64 => Topbar height
  },
}

type Props = {
  classes: Object,
}

class Auth extends React.PureComponent<Props> {
  handleAuth = () => {
    const provider = new firebaseApp.auth.GoogleAuthProvider()
    firebaseApp.auth().signInWithPopup(provider)
  }

  render() {
    const { classes } = this.props
    return (
      <Grid container justify="center" alignItems="center" className={classes.root}>
        <Button aria-label="Login" onClick={this.handleAuth} variant="contained" color="primary">
          <Icon>
            lock
          </Icon>
          Login with Google
        </Button>
      </Grid>
    )
  }
}

export default withStyles(styles)(Auth)

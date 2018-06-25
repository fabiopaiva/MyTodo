// @flow
import React from 'react'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import UserMenu from './UserMenu'
import type { User } from '../../types/user'

const styles = {
  flex: {
    flex: 1,
  },
}

type Props = {
  classes: Object,
  user: User
}

const mapStateToProps = state => ({
  user: state.user,
})

export default withStyles(styles)(connect(mapStateToProps)(({ classes, user }: Props) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit" className={classes.flex}>
        todos
      </Typography>
      {user.isSignedIn && <UserMenu user={user} />}
    </Toolbar>
  </AppBar>
)))

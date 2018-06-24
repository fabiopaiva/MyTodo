// @flow
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  flex: {
    flex: 1,
  },
}

type Props = {
  classes: Object,
}

export default withStyles(styles)(({ classes }: Props) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit" className={classes.flex}>
        todos
      </Typography>
    </Toolbar>
  </AppBar>
))

// @flow
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit,
  },
  button: {
    fontSize: 10,
    padding: 0,
  },
})

type Props = {
  classes: Object,
  left: number
}

const TodoFooter = ({ classes, left }: Props) => (
  <Grid container justify="space-between" alignItems="center" className={classes.root}>
    <Grid xs={3} item>
      <Typography>
        {left}
        {left !== 1 ? ' items ' : ' item '}
        left
      </Typography>
    </Grid>
    <Grid xs={2} item>
      <Button variant="text" size="small" className={classes.button}>
        All
      </Button>
    </Grid>
    <Grid xs={2} item>
      <Button variant="text" size="small" className={classes.button}>
        Active
      </Button>
    </Grid>
    <Grid xs={2} item>
      <Button variant="text" size="small" className={classes.button}>
        Completed
      </Button>
    </Grid>
    <Grid xs={2} item>
      <Button variant="text" size="small" className={classes.button}>
        Clear Completed
      </Button>
    </Grid>
  </Grid>
)

const mapStateToProps = state => ({
  left: state.todos.items.filter(item => !item.completed).length,
})

export default withStyles(styles)(connect(mapStateToProps)(TodoFooter))

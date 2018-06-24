// @flow
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { setVisibilityFilter } from '../../actions/VisibilityFilterActions'
import { clearCompleted } from '../../actions/TodoActions'
import type { FilterType } from '../../actions/VisibilityFilterActions'
import types from '../../constants/ActionTypes'

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
  left: number,
  setVisibilityFilter: (filter: FilterType) => void,
  filter: string,
  clearCompleted: () => void,
  hasCompleted: boolean,
}

const TodoFooter = ({
  classes,
  left,
  setVisibilityFilter: fnSetVisibilityFilter,
  filter,
  clearCompleted: fnClearCompleted,
  hasCompleted,
}: Props) => (
  <Grid container justify="space-between" alignItems="center" className={classes.root}>
    <Grid xs={3} item>
      <Typography>
        {left}
        {left !== 1 ? ' items ' : ' item '}
        left
      </Typography>
    </Grid>
    <Grid xs={2} item>
      <Button
        variant={filter === types.SHOW_ALL ? 'outlined' : 'text'}
        size="small"
        className={classes.button}
        onClick={() => fnSetVisibilityFilter(types.SHOW_ALL)}
      >
        All
      </Button>
    </Grid>
    <Grid xs={2} item>
      <Button
        variant={filter === types.SHOW_ACTIVE ? 'outlined' : 'text'}
        size="small"
        className={classes.button}
        onClick={() => fnSetVisibilityFilter(types.SHOW_ACTIVE)}
      >
        Active
      </Button>
    </Grid>
    <Grid xs={2} item>
      <Button
        variant={filter === types.SHOW_COMPLETED ? 'outlined' : 'text'}
        size="small"
        className={classes.button}
        onClick={() => fnSetVisibilityFilter(types.SHOW_COMPLETED)}
      >
        Completed
      </Button>
    </Grid>
    {hasCompleted && (
      <Grid xs={2} item>
        <Button
          variant="text"
          size="small"
          className={classes.button}
          onClick={() => fnClearCompleted()}
        >
          Clear Completed
        </Button>
      </Grid>
    )}

  </Grid>
)

const mapStateToProps = state => ({
  left: state.todos.items.filter(item => !item.completed).length,
  hasCompleted: !!state.todos.items.find(item => item.completed),
  filter: state.visibilityFilter,
})

export default withStyles(styles)(
  connect(mapStateToProps, { setVisibilityFilter, clearCompleted })(TodoFooter),
)

// @flow
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import TodoItem from '../TodoItem'
import type { Todo } from '../../types/todo'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  wrapper: {
    flexGrow: 1,
    maxWidth: 550,
    margin: theme.spacing.unit,
  },
})

type Props = {
  classes: Object,
  // addTodo: (text: string) => void,
}

type State = {
  inputValue: string,
  items: Array<Todo>,
}

class TodoList extends React.Component<Props, State> {
  render() {
    const { classes, items } = this.props
    if (!items.length) return null

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Paper className={classes.wrapper} elevation={0}>
              <List component="nav">
                {items.map(item => <TodoItem key={item.id} item={item} />)}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  items: state.todos.items,
})

export default withStyles(styles)(connect(mapStateToProps, { })(TodoList))

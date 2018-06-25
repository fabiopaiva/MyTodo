// @flow
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import Checkbox from '@material-ui/core/Checkbox'
import TodoItem from '../TodoItem'
import TodoFooter from '../TodoFooter'
import { setAllTodosStatus, listenFirebaseDBRef } from '../../actions/TodoActions'
import types from '../../constants/ActionTypes'
import type { Todo } from '../../types/todo'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  wrapper: {
    flexGrow: 1,
    maxWidth: 800,
    margin: theme.spacing.unit,
  },
})

type Props = {
  classes: Object,
  items: Array<Todo>,
  setAllTodosStatus: (status: boolean) => void,
  filter: string,
  listenFirebaseDBRef: Function,
}
class TodoList extends React.Component<Props> {
  componentDidMount() {
    const { listenFirebaseDBRef: fnListenFirebaseDBRef } = this.props
    this.dbListener = fnListenFirebaseDBRef()
  }

  componentWillUnmount() {
    this.dbListener.remove()
  }

  dbListener: { remove: Function }

  render() {
    const {
      classes,
      items,
      setAllTodosStatus: fnSetAllTodosStatus,
      filter,
    } = this.props
    if (!items.length) return null

    const isAllItemsChecked = items.filter(item => item.completed).length === items.length

    const criteria = item => filter === types.SHOW_ALL
      || (filter === types.SHOW_ACTIVE && !item.completed)
      || (filter === types.SHOW_COMPLETED && item.completed)

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Paper className={classes.wrapper} elevation={0}>
              <Grid container justify="flex-end">
                <Checkbox
                  checked={!!isAllItemsChecked}
                  onChange={() => fnSetAllTodosStatus(!isAllItemsChecked)}
                />
              </Grid>
              <List component="nav">
                {items.filter(criteria).map(
                  item => <TodoItem key={item.id || Date.now()} item={item} />,
                )}
              </List>
              <TodoFooter />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  items: state.todos.items,
  filter: state.visibilityFilter,
})

export default withStyles(styles)(
  connect(mapStateToProps, { setAllTodosStatus, listenFirebaseDBRef })(TodoList),
)

// @flow
import React from 'react'
import { connect } from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Checkbox from '@material-ui/core/Checkbox'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grid from '@material-ui/core/Grid'
import teal from '@material-ui/core/colors/teal'
import yellow from '@material-ui/core/colors/yellow'
import orange from '@material-ui/core/colors/orange'
import red from '@material-ui/core/colors/red'
import { withStyles } from '@material-ui/core/styles'
import TodoInput from '../TodoInput'
import TodoCountDown from '../TodoCountDown'
import { toggleTodo, removeTodo } from '../../actions/TodoActions'

import type { Todo } from '../../types/todo'

const priorityColors = [
  '#000000',
  teal[900],
  yellow[900],
  orange[900],
  red[900],
]

const styles = {
  pending: {
    opacity: 0.4,
  },
  completed: {
    textDecoration: 'line-through',
  },
  ...priorityColors.reduce((acc, item, index) => {
    acc[`priority${index}`] = {
      color: item,
    }
    return acc
  }, {}),
}

type Props = {
  item: Todo,
  toggleTodo: (todo: Todo) => void,
  removeTodo: (id: string) => void,
  classes: Object,
}

type State = {
  isEditing: boolean,
}

class TodoItem extends React.Component<Props, State> {
  state = {
    isEditing: false,
  }

  handleToggle = () => {
    const { toggleTodo: fnToggle, item } = this.props
    if (item.id) {
      fnToggle(item)
    }
  }

  handleRemove = () => {
    const { removeTodo: fnRemove, item } = this.props
    if (item.id) {
      fnRemove(item.id)
    }
  }

  handleItemClick = () => {
    this.setState({ isEditing: true })
  }

  handleClickOutside = () => {
    this.setState({ isEditing: false })
  }

  handleInputRefEditing = (ref: ?HTMLInputElement) => {
    if (ref) {
      this.inputRefEditing = ref
      ref.focus()
    }
  }

  handleFinishEditing = () => {
    this.setState({ isEditing: false })
  }

  inputRefEditing: ?HTMLInputElement

  render() {
    const { item, classes } = this.props
    const { isEditing } = this.state

    return isEditing ? (
      <ClickAwayListener onClickAway={this.handleClickOutside}>
        <TodoInput
          item={item}
          onUpdate={this.handleFinishEditing}
          inputRef={this.handleInputRefEditing}
        />
      </ClickAwayListener>
    )
      : (
        <ListItem
          dense
          button
          onClick={this.handleItemClick}
          className={!item.id ? classes.pending : ''}
        >
          <ListItemText
            primary={(
              <Grid direction="row" container justify="flex-start">
                <Grid item xs={7} className={!item.completed ? classes[`priority${item.priority}`] : ''}>
                  <Typography color={item.completed ? 'secondary' : 'inherit'} variant="subheading">
                    {item.text}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  {!item.completed && item.dueTime && <TodoCountDown time={item.dueTime} />}
                </Grid>
              </Grid>
            )}
            className={item.completed ? classes.completed : ''}
          />
          <ListItemSecondaryAction>
            <Checkbox checked={!!item.completed} onChange={this.handleToggle} />
            <IconButton aria-label="Delete" onClick={this.handleRemove}>
              <Icon>
                delete
              </Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )
  }
}

export default withStyles(styles)(connect(undefined, { toggleTodo, removeTodo })(TodoItem))

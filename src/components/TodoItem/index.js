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
import { withStyles } from '@material-ui/core/styles'
import TodoInput from '../TodoInput'
import { toggleTodo, removeTodo } from '../../actions/TodoActions'

import type { Todo } from '../../types/todo'

const styles = {
  completed: {
    textDecoration: 'line-through',
  },
}

type Props = {
  item: Todo,
  toggleTodo: (id: number) => void,
  removeTodo: (id: number) => void,
  classes: Object,
}

type State = {
  isEditing: boolean,
}

class TodoItem extends React.Component<Props, State> {
  state = {
    isEditing: false,
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside)
  }

  handleToggle = () => {
    const { toggleTodo: fnToggle, item } = this.props
    fnToggle(item.id)
  }

  handleRemove = () => {
    const { removeTodo: fnRemove, item } = this.props
    fnRemove(item.id)
  }

  handleItemClick = () => {
    this.setState(
      { isEditing: true },
      () => setTimeout(() => window.addEventListener('click', this.handleClickOutside), 0),
    )
  }

  handleClickOutside = (event) => {
    if (event.target !== this.inputRefEditing) {
      this.setState({ isEditing: false })
      window.removeEventListener('click', this.handleClickOutside)
    }
  }

  handleInputRefEditing = (ref: ?HTMLInputElement) => {
    if (ref) {
      this.inputRefEditing = ref
      ref.focus()
    }
  }

  handleFinishEditing = () => {
    this.setState({ isEditing: false })
    window.removeEventListener('click', this.handleClickOutside)
  }

  inputRefEditing: ?HTMLInputElement

  render() {
    const { item, classes } = this.props
    const { isEditing } = this.state

    return isEditing ? (
      <TodoInput
        item={item}
        onUpdate={this.handleFinishEditing}
        inputRef={this.handleInputRefEditing}
      />
    )
      : (
        <ListItem dense button onClick={this.handleItemClick}>
          <ListItemText
            primary={(
              <Typography color={item.completed ? 'secondary' : 'primary'} variant="subheading">
                {item.text}
              </Typography>
            )}
            className={item.completed ? classes.completed : ''}
          />
          <ListItemSecondaryAction>
            <Checkbox checked={item.completed} onChange={this.handleToggle} />
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
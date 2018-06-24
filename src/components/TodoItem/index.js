// @flow
import React from 'react'
import { connect } from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Checkbox from '@material-ui/core/Checkbox'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { toggleTodo, removeTodo } from '../../actions/TodoActions'

import type { Todo } from '../../types/todo'

type Props = {
  item: Todo,
  toggleTodo: (id: number) => void,
  removeTodo: (id: number) => void,
}

class TodoItem extends React.Component<Props> {
  handleToggle = () => {
    const { toggleTodo: fnToggle, item } = this.props
    fnToggle(item.id)
  }

  handleRemove = () => {
    const { removeTodo: fnRemove, item } = this.props
    fnRemove(item.id)
  }

  render() {
    const { item } = this.props
    return (
      <ListItem dense button>
        <ListItemText primary={item.text} />
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

export default connect(undefined, { toggleTodo, removeTodo })(TodoItem)

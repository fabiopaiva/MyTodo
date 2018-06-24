// @flow
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import { addTodo } from '../../actions/TodoActions'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  inputWrapper: {
    flexGrow: 1,
    maxWidth: 550,
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
  },
  input: {
    width: '100%',
  },
})

type Props = {
  classes: Object,
  addTodo: (text: string) => void,
}

type State = {
  inputValue: string,
}

class TodoInput extends React.Component<Props, State> {
  state = {
    inputValue: '',
  }

  componentDidMount() {
    if (this.inputRef) {
      this.inputRef.addEventListener('keyup', this.handleKeyUp)
    }
  }

  componentWillUnmount() {
    if (this.inputRef) {
      this.inputRef.removeEventListener('keyup', this.handleKeyUp)
    }
  }

  handleChange = (event: SyntheticInputEvent<*>) => {
    this.setState({ inputValue: event.target.value })
  }

  handleInputRef = (ref: HTMLInputElement) => {
    this.inputRef = ref
  }

  handleKeyUp = (event: KeyboardEvent) => {
    const { addTodo: fnAddTodo } = this.props
    const { inputValue } = this.state
    if (event.code === 'Enter') {
      fnAddTodo(inputValue)
      this.setState({ inputValue: '' })
    }
  }

  inputRef: ?HTMLInputElement

  render() {
    const { classes } = this.props
    const { inputValue } = this.state

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Paper className={classes.inputWrapper}>
              <FormControl fullWidth className={classes.input}>
                <TextField
                  label="What needs to be done?"
                  value={inputValue}
                  onChange={this.handleChange}
                  inputRef={this.handleInputRef}
                />
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(connect(undefined, { addTodo })(TodoInput))

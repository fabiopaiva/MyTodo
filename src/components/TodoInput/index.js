// @flow
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/lab/Slider'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { saveTodo } from '../../actions/TodoActions'
import type { Todo } from '../../types/todo'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  inputWrapper: {
    flexGrow: 1,
    maxWidth: 800,
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
})

type Props = {
  classes: Object,
  saveTodo: (todo: Todo) => void,
  item?: Todo,
  onUpdate?: () => void,
  inputRef?: (ref: HTMLInputElement) => void,
}

type State = {
  inputValue: string,
  priority: number,
  error: boolean,
}

class TodoInput extends React.Component<Props, State> {
  static defaultProps = {
    item: null,
    onUpdate: () => { },
    inputRef: () => { },
  }

  constructor(props: Props) {
    super(props)
    const { item } = props

    this.state = {
      inputValue: item ? item.text : '',
      priority: item ? item.priority : 0,
      error: false,
    }
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
    this.setState({ [event.target.name]: event.target.value, error: false })
  }

  handlePriorityChange = (event: SyntheticInputEvent<*>, value: number) => {
    this.setState({ priority: value })
  }

  handleInputRef = (ref: HTMLInputElement) => {
    const { inputRef } = this.props
    this.inputRef = ref
    if (inputRef) {
      inputRef(ref)
    }
  }

  handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.save()
    }
  }

  save = () => {
    const {
      saveTodo: fnSaveTodo,
      item,
      onUpdate,
    } = this.props
    const { inputValue, priority } = this.state
    if (inputValue === '') {
      this.setState({ error: true })
    } else {
      this.setState({ inputValue: '', priority: 0 })
      if (item) {
        item.text = inputValue
        item.priority = priority
        fnSaveTodo(item)
        if (onUpdate) {
          onUpdate()
        }
      } else {
        fnSaveTodo({ text: inputValue, priority })
      }
    }
  }

  inputRef: ?HTMLInputElement

  render() {
    const { classes } = this.props
    const { inputValue, priority, error } = this.state

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Paper className={classes.inputWrapper}>
              <Grid direction="row" container alignItems="flex-end" alignContent="center" spacing={24}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth className={classes.input}>
                    <TextField
                      error={error}
                      name="inputValue"
                      label="What needs to be done?"
                      value={inputValue}
                      onChange={this.handleChange}
                      inputRef={this.handleInputRef}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography>
                    { /* eslint-disable-next-line react/jsx-one-expression-per-line */ }
                    Priority ({priority + 1})
                  </Typography>
                  <Slider
                    value={priority}
                    min={0}
                    max={4}
                    step={1}
                    onChange={this.handlePriorityChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Grid container justify="flex-end">
                    <Button onClick={this.save}>
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(connect(undefined, { saveTodo })(TodoInput))

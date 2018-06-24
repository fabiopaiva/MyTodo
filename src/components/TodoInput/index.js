// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'

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
}

type State = {
  inputValue: string,
}

class TodoInput extends React.Component<Props, State> {
  state = {
    inputValue: '',
  }

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value })
  }

  render() {
    const { classes } = this.props
    const { inputValue } = this.state

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Paper className={classes.inputWrapper}>
              <FormControl fullWidth className={classes.input}>
                <TextField label="What needs to be done?" value={inputValue} onChange={this.handleChange} />
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(TodoInput)

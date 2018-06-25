// @flow
import React from 'react'
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import { logout } from '../../actions/UserActions'
import type { User } from '../../types/user'

type Props = {
  user: User,
  logout: Function,
}

type State = {
  anchorEl: ?HTMLButtonElement,
}

class UserMenu extends React.PureComponent<Props, State> {
  state = {
    anchorEl: null,
  };

  handleClick = (event: SyntheticEvent<*>) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleLogout = () => {
    this.props.logout() // eslint-disable-line react/destructuring-assignment
  }

  render() {
    const { user } = this.props
    const { anchorEl } = this.state

    return (
      <React.Fragment>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <Avatar alt="Profile" src={user.profile.photoURL} />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </React.Fragment>
    )
  }
}

export default connect(undefined, { logout })(UserMenu)

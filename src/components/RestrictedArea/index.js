// @flow
import React from 'react'
import { connect } from 'react-redux'
import type { FirebaseUser } from 'firebase/app'
import TodoInput from '../TodoInput'
import TodoList from '../TodoList'
import Auth from '../Auth'
import firebase from '../../firebase'
import { authSuccess } from '../../actions/UserActions'

type Props = {
  authSuccess: (user: FirebaseUser) => void,
  isSignedIn: boolean,
}

class RestrictedArea extends React.PureComponent<Props> {
  componentDidMount() {
    const { authSuccess: fnAuthSuccess } = this.props
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user: FirebaseUser) => {
      if (user) {
        fnAuthSuccess(user)
      }
    })
  }

  componentWillUnmount() {
    if (this.unregisterAuthObserver) {
      this.unregisterAuthObserver()
    }
  }

  unregisterAuthObserver: ?Function

  render() {
    const { isSignedIn } = this.props
    return (
      <React.Fragment>
        {isSignedIn && (
          <React.Fragment>
            <TodoInput />
            <TodoList />
          </React.Fragment>
        )}
        {!isSignedIn && <Auth />}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isSignedIn: state.user.isSignedIn,
})

export default connect(mapStateToProps, { authSuccess })(RestrictedArea)

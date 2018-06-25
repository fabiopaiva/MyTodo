// @flow

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// Initalize and export Firebase.
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}
// $FlowFixMe the variables come from env
export default firebase.initializeApp(config).firebase_ // eslint-disable-line no-underscore-dangle

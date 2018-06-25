// @flow

import type { FirebaseUser } from 'firebase/app'

export type User = {
  isSignedIn: boolean,
  profile?: FirebaseUser,
}

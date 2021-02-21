import { register } from 'react-native-bundle-splitter'
import { LoginScreen } from '@screens/Login'
import { MODAL_NAMES } from 'src/constants/navigation'

import { ERouterScreens } from '@types'
// import { LINKING } from 'src/constants/linking'

export const MODALS = {
  [ERouterScreens.Login]: {
    screen: LoginScreen
    // path: LINKING[MODAL_NAMES.SIGN_IN]
  }
}

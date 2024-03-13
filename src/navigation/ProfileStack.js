import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { SCREEN_NAMES } from '../constants/navigation'
import { ProfileScreenPresenter } from '../screens/Profile/ProfileScreenPresenter'
import { EditProfile } from '../screens/Profile/EditProfile'

const ProfileStack = createStackNavigator(
  {
    [SCREEN_NAMES.ProfileScreenPresenter]: ProfileScreenPresenter,
    // [SCREEN_NAMES.EditProfile]: EditProfile,
  },
  {
    headerMode: 'none',
    // initialRouteName: SCREEN_NAMES.EditProfile,
  }
)
export default createAppContainer(ProfileStack)

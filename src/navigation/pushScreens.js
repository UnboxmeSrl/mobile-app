import { OnboardingScreen } from '@screens/Onboarding'
import { OtherSingUpOptionsScreen } from '@screens/OtherSignUpOptions'
import { SignInScreen } from '@screens/SignIn'
import { SignUpScreen } from '@screens/SignUp'

import { SCREEN_NAMES } from '@const/navigation'

export default {
  [SCREEN_NAMES.Onboarding]: {
    screen: OnboardingScreen,
  },
  [SCREEN_NAMES.SignUp]: {
    screen: SignUpScreen,
  },
  [SCREEN_NAMES.OtherSignUp]: {
    screen: OtherSingUpOptionsScreen,
  },
  [SCREEN_NAMES.SignIn]: {
    screen: SignInScreen,
  },
}
